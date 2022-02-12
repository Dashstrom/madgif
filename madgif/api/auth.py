import uuid
import datetime

from flask import Blueprint, request, jsonify, make_response
from flask_restful import Api
from flask_cors import cross_origin
import jwt

from ..extensions import db, bcrypt
from ..models import User
from ..config import Config


auth = Blueprint('/auth', __name__, url_prefix='/auth')
auth_wrap = Api(auth)


@auth.route('/register', methods=['POST'])
@cross_origin()
def signup_user():
    data = request.get_json()
    username_taken = User.query.filter_by(username=data['username']).first()
    if username_taken:
        return make_response('username already taken', 409)
    new_user = User(
        public_id=str(uuid.uuid4()),
        username=data['username'],
        password=bcrypt.generate_password_hash(data['password']),
        admin=False
    )
    db.session.add(new_user)
    db.session.commit()
    return jsonify({'message': 'registered successfully'})


@auth.route('/login', methods=['POST'])
@cross_origin()
def login_user():
    data = request.get_json()
    username = data.get("username")
    password = data.get("password")
    if data and username and password:
        user = User.query.filter_by(username=username).first()
        if user and bcrypt.check_password_hash(user.password, password):
            exp = datetime.datetime.utcnow() + datetime.timedelta(minutes=60)
            token = jwt.encode({
                'public_id': user.public_id,
                'exp': exp
            }, Config.SECRET_KEY, algorithm="HS512")
            return jsonify({'token': token})
    return make_response(
        'could not verify',
        401,
        {'WWW.Authentication': 'Basic realm: "login required"'}
    )
