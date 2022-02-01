import uuid
import datetime

from flask import Blueprint
from flask import request, jsonify, make_response
from flask_restful import Api
from werkzeug.security import generate_password_hash, check_password_hash
import jwt

from ..extensions import db
from ..models import User


auth = Blueprint('auth', __name__, url_prefix='/auth')
auth_wrap = Api(auth)


@auth.route('/register', methods=['GET', 'POST'])
def signup_user():
    data = request.get_json()
    print(data)
    hashed_password = generate_password_hash(data['password'], method='sha256')
    new_user = User(
        public_id=str(uuid.uuid4()),
        name=data['name'],
        password=hashed_password,
        admin=False
    )
    db.session.add(new_user)
    db.session.commit()
    return jsonify({'message': 'registered successfully'})


@auth.route('/login', methods=['GET', 'POST'])
def login_user():
    authorization = request.authorization

    if authorization and authorization.username and authorization.password:
        user = User.query.filter_by(name=authorization.username).first()

        if user and check_password_hash(user.password, authorization.password):
            exp = datetime.datetime.utcnow() + datetime.timedelta(minutes=30)
            token = jwt.encode({
                'public_id': user.public_id,
                'exp': exp
            }, auth.config['SECRET_KEY'])
            return jsonify({'token': token.decode('UTF-8')})

    return make_response(
        'could not verify',
        401,
        {'WWW.Authentication': 'Basic realm: "login required"'}
    )
