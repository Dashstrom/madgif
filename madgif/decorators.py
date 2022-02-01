from io import BytesIO
from functools import wraps
import jwt
from PIL import Image
from flask import  send_file, request, jsonify
from flask_login import current_user

from .models import User
from .config import Config


def serve_image(f):
    @wraps(f)
    def decorator(*args, **kwargs):
        res = f(current_user, *args, **kwargs)
        if isinstance(res, Image.Image):
            img_io = BytesIO()
            res.save(img_io, "png")
            img_io.seek(0)
            return send_file(img_io, mimetype="images/png")
    return decorator


def token_required(f):
    @wraps(f)
    def decorator(*args, **kwargs):
        token = None
        if 'x-access-tokens' in request.headers:
            token = request.headers['x-access-tokens']
        if not token:
            return jsonify({'message': 'a valid token is missing'})
        try:
            data = jwt.decode(token, Config.SECRET_KEY)
            current_user = User.query.filter_by(public_id=data['public_id']).first()
        except Exception:
            return jsonify({'message': 'token is invalid'})

        return f(current_user, *args, **kwargs)
    return decorator
