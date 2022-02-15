from io import BytesIO
from time import time
import uuid

import PIL.Image
import PIL.ImageSequence
from flask import Blueprint, jsonify, request, send_file
from flask_restful import Api
from flask_cors import cross_origin
from werkzeug.utils import secure_filename

from ..extensions import db
from ..decorators import jwt_required
from ..models import Image, User
from ..utils import allowed_file, b2img, filename_to_minetype, img2io

images = Blueprint('images', __name__, url_prefix='/images')
images_wrap = Api(images)


@images.route('', methods=['OPTIONS'])
@cross_origin()
def get_images_options():
    return jsonify({"msg": "ok"}), 200


@images.route('/<string:iid>', methods=['OPTIONS'])
@cross_origin()
def get_image_options():
    return jsonify({"msg": "ok"}), 200


@images.route('/<string:iid>/raw', methods=['OPTIONS'])
@cross_origin()
def get_raw_image_options():
    return jsonify({"msg": "ok"}), 200


@images.route('/<string:iid>/edit', methods=['OPTIONS'])
@cross_origin()
def edit_image_options():
    return jsonify({"msg": "ok"}), 200


@images.route('', methods=['POST'])
@jwt_required
@cross_origin()
def upload_image(user: User):
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
    img = Image.img(user.id, public_id)
    return jsonify(img.json()), 200


@images.route('', methods=['GET'])
@jwt_required
@cross_origin()
def get_images(user: User):
    imgs = Image.query.filter_by(author_id=user.id)
    return jsonify([img.json() for img in imgs]), 200


@images.route('/<string:iid>', methods=['GET'])
@jwt_required
@cross_origin()
def get_image(user: User, iid: str):
    img = Image.img(user.id, iid)
    if img is None:
        return jsonify({"msg": "Can't find image"}), 404
    return jsonify(img.json()), 200


@images.route('/<string:iid>/raw', methods=['GET'])
@jwt_required
@cross_origin()
def get_raw_image(user: User, iid: str):
    img = Image.img(user.id, iid)
    if img is None:
        return jsonify({"msg": "Can't find image"}), 404
    return send_file(BytesIO(img.raw), filename_to_minetype(img.name)), 200


def report(img):
    img.save(f"render/{time() * 1_000_000:.0f}.png")
    print(img)


@images.route('/<string:iid>', methods=['PUT'])
@jwt_required
@cross_origin()
def update_image(user: User, iid: str):
    if 'file' not in request.files:
        return jsonify({'msg': 'No file part'}), 400
    file = request.files['file']
    if file.filename == '':
        return jsonify({'msg': 'No selected file'}), 400
    if not file or not allowed_file(file.filename):
        return jsonify({'msg': 'Invalid file type'})
    filename = secure_filename(file.filename)
    img = Image.img(user.id, iid)
    if img is None:
        return jsonify({"msg": "Can't find image"}), 404
    img.name = filename
    img.raw = file.read()
    db.session.commit()
    return jsonify({"msg": "Updated"}), 200


@images.route('/<string:iid>/edit', methods=['POST'])
@jwt_required
@cross_origin()
def edit_image(user: User, iid: str):
    img = Image.img(user.id, iid)
    if img is None:
        return jsonify({"msg": 'Not found'}), 404
    data: dict = request.get_json()
    if not isinstance(data, dict):
        return jsonify({"msg": 'Wrong json'}), 404

    im = b2img(img.raw)
    im.seek(im.tell() + 1)  # load all frames

    w, h = im.size
    w, h = int(data.get('w', w)), int(data.get('h', h))
    rotate = int(data.get('rotate', 0))
    cropX, cropY = int(data.get('cropX', 0)), int(data.get('cropY', 0))
    cropW, cropH = int(data.get('cropW', w)), int(data.get('cropH', h))

    resizing = ('w' in data or 'h' in data) and (w, h) != im.size
    croping = any("crop" + c in data for c in 'XYWH')
    rotating = rotate != 0

    frames: list[PIL.Image.Image] = PIL.ImageSequence.all_frames(im)

    if resizing:
        for i, frame in enumerate(frames):
            frames[i] = frame.resize((w, h))

    if rotating:
        for i, frame in enumerate(frames):
            frames[i] = frame.rotate(rotate)
        if croping:
            cropX += (im.size[0] - w) / 2
            cropY += (im.size[1] - h) / 2

    if croping:
        for i, frame in enumerate(frames):
            frames[i] = frame.crop((
                cropX,
                cropY,
                cropX + cropW,
                cropY + cropH
            ))

    img.raw = img2io(frames, img.ext(), im.info).read()
    db.session.commit()
    return jsonify({"msg": "Updated"}), 200


@images.route('/<string:iid>', methods=['DELETE'])
@jwt_required
@cross_origin()
def delete_image(user: User, iid: str):
    Image.query.filter_by(author_id=user.id, public_id=iid).delete()
    db.session.commit()
    return jsonify({"msg": "Deleted"}), 200
