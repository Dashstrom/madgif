# -*- coding: utf-8 -*-

from flask import Flask

from .config import Config
from .api import auth


def create_app(app_name=None):
    """Create a Flask app."""

    if app_name is None:
        app_name = Config.PROJECT

    app = Flask(app_name)
    app.config.update({
        'SECRET_KEY': Config.SECRET_KEY,
        'SQLALCHEMY_DATABASE_URI': Config.SQLALCHEMY_DATABASE_URI,
        'SQLALCHEMY_TRACK_MODIFICATIONS': Config.SQLALCHEMY_TRACK_MODIFICATIONS,
        'APPLICATION_ROOT': Config.APPLICATION_ROOT
    })
    app.register_blueprint(auth)
    return app
