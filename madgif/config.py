# -*- coding: utf-8 -*-

import os


class Config(object):

    PROJECT = "madgif"
    PROJECT_ROOT = os.path.abspath(os.path.dirname(os.path.dirname(__file__)))

    APPLICATION_ROOT = "/api"

    DEBUG = False
    TESTING = False

    SECRET_KEY = 'secret key'
    MAX_CONTENT_LENGTH = 16 * 1024 * 1024

    SQLALCHEMY_ECHO = False
    SQLALCHEMY_TRACK_MODIFICATIONS = True
    SQLALCHEMY_DATABASE_URI = 'mysql://madgif:madgif@localhost/db?charset=utf8'
