# -*- coding: utf-8 -*-

import logging

from flask import Flask
from flask_cors import CORS

from .config import Config
from .api import auth, images
from .extensions import db, bcrypt


def create_app(app_name: str = None) -> Flask:
    """Create a Flask app."""

    if app_name is None:
        app_name = Config.PROJECT

    app = Flask(app_name)
    app.config.from_object(Config)
    CORS(app)
    logging.getLogger('flask_cors').level = logging.DEBUG
    app.register_blueprint(auth)
    app.register_blueprint(images)
    db.init_app(app)
    bcrypt.init_app(app)

    app.before_first_request(db.create_all)
    return app
