from io import BytesIO
import uuid

from flask import Blueprint, jsonify, request, send_file
from flask_restful import Api
from flask_cors import cross_origin
from werkzeug.utils import secure_filename

from ..extensions import db
from ..decorators import jwt_required
from ..models import Image
from ..utils import allowed_file, filename_to_minetype

images = Blueprint('images', __name__, url_prefix='/images')
images_wrap = Api(images)


@images.route('', methods=['OPTIONS'])
@cross_origin()
def get_images_options():
    return jsonify({"msg": "ok"}), 200


@images.route('/<string:iid>', methods=['OPTIONS'])
@cross_origin()
def get_image_by_id_options():
    return jsonify({"msg": "ok"}), 200


@images.route('/<string:iid>/raw', methods=['OPTIONS'])
@cross_origin()
def get_raw_image_by_id_options():
    return jsonify({"msg": "ok"}), 200


@images.route('', methods=['POST'])
@jwt_required
@cross_origin()
def upload_image(user):
    if 'file' not in request.files:
        return jsonify({'msg': 'No file part'}), 400
    file = request.files['file']
    if file.filename == '':
        return jsonify({'msg': 'No selected file'}), 400
    if not file or not allowed_file(file.filename):
        return jsonify({'msg': 'Invalid file type'})
    filename = secure_filename(file.filename)
    public_id = str(uuid.uuid4())
    img = Image(
        public_id=public_id,
        author_id=user.id,
        raw=file.read(),
        name=filename
    )
    db.session.add(img)
    db.session.commit()
    return jsonify({'public_id': public_id}), 202


@images.route('', methods=['GET'])
@jwt_required
@cross_origin()
def get_images(user):
    imgs = Image.query.filter_by(author_id=user.id)
    return jsonify([img.json() for img in imgs]), 200


@images.route('/<string:iid>', methods=['GET'])
@jwt_required
@cross_origin()
def get_image_by_id(user, iid):
    img = Image.query.filter_by(author_id=user.id, public_id=iid).first()
    return jsonify(img.json()), 200


@images.route('/<string:iid>/raw', methods=['GET'])
@jwt_required
@cross_origin()
def get_raw_image_by_id(user, iid):
    img = Image.query.filter_by(author_id=user.id, public_id=iid).first()
    if img is None:
        return jsonify({"msg": "Can't find image"}), 404
    return send_file(BytesIO(img.raw), filename_to_minetype(img.name)), 200


@images.route('/<string:iid>', methods=['UPDATE'])
@jwt_required
@cross_origin()
def update_image(user, iid):
    if 'file' not in request.files:
        return jsonify({'msg': 'No file part'}), 400
    file = request.files['file']
    if file.filename == '':
        return jsonify({'msg': 'No selected file'}), 400
    if not file or not allowed_file(file.filename):
        return jsonify({'msg': 'Invalid file type'})
    filename = secure_filename(file.filename)
    img = Image.img(user.id, iid).first()
    img.name = filename
    img.raw = file.read()
    db.session.commit()
    return jsonify({"msg": "Updated"}), 200


@images.route('/<string:iid>', methods=['DELETE'])
@jwt_required
@cross_origin()
def delete_image_by_id(user, iid):
    Image.img(user.id, iid).delete()
    db.session.commit()
    return jsonify({"msg": "Deleted"}), 200
