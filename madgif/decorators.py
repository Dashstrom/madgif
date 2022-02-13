from functools import wraps
import jwt
from PIL import Image
from flask import send_file, request, jsonify, make_response

from .utils import img2io
from .models import User
from .config import Config


def serve_image(f):
    @wraps(f)
    def decorator(*args, **kwargs):
        res = f(*args, **kwargs)
        if isinstance(res, Image.Image):
            return send_file(img2io(res), mimetype="images/png")
        return res
    return decorator


def jwt_required(f):
    @wraps(f)
    def decorator(*args, **kwargs):
        token = None
        if 'x-access-tokens' in request.headers:
            token = request.headers['x-access-tokens']
        if not token:
            return jsonify({'message': 'a valid token is missing'}), 401
        try:
            data = jwt.decode(token, Config.SECRET_KEY, algorithms=["HS512"])
            current_user = User.query.filter_by(public_id=data['public_id']).first()
        except Exception as e:
            return jsonify({'message': 'token is invalid : ' + str(e)}), 401

        return f(current_user, *args, **kwargs)
    return decorator


def admin_required(f):
    @jwt_required
    @wraps(f)
    def decorator(current_user: User, *args, **kwargs):
        if current_user.admin is not True:
            return make_response('Reserved for the administrator', 403)
        return f(current_user, *args, **kwargs)
    return decorator
