from flask import Flask, request, jsonify, g, render_template
from .settings import access_key_id, secret_access_key, acl, bucket_name, bucket_region
from .email_settings import mail_server, mail_port, mail_username, mail_password
from .shipping_settings import shipping_address, shipping_zip, shipping_city, shipping_state
from .stripe_config import stripe_publishable, stripe_secret

class Config(object):
    DEBUG = False
    TESTING = False
    SECRET_KEY = "B\xb2?.\xdf\x9f\xa7m\xf8\x8a%,\xf7\xc4\xfa\x91"

    DB_NAME = "production-db"
    DB_USERNAME = "admin"
    DB_PASSWORD = "example"

    IMAGE_UPLOADS = "/home/username/app/app/static/images/uploads"

    SESSION_COOKIE_SECURE = True

class ProductionConfig(Config):
    pass

class DevelopmentConfig(Config):
    
    SECRET_KEY = 'the quick brown fox jumps over the lazy dog'
    DEBUG = True
    SQLALCHEMY_DATABASE_URI = 'sqlite:///db.sqlite'
    SQLALCHEMY_COMMIT_ON_TEARDOWN = True
    UPLOAD_FOLDER = 'uploads'
    UPLOAD_URL = "https://"+bucket_name+".s3.us-east-2.amazonaws.com/"
    TESTING = False
    MAIL_SUPPRESS_SEND = False
    MAIL_DEBUG = True
    MAIL_SERVER = mail_server
    MAIL_PORT = mail_port
    MAIL_USERNAME = mail_username
    MAIL_PASSWORD = mail_password
    MAIL_USE_TLS = 1
    launch_url = "http://localhost:3000/"
    REDIRECT_URI="http://localhost:3000/"

    #SHIPPING
    SHIP_ADDRESS = shipping_address
    SHIP_CITY = shipping_city
    SHIP_STATE = shipping_state
    SHIP_ZIP = shipping_zip

    SESSION_COOKIE_SECURE = False

class TestingConfig(Config):
    TESTING = True
    DEBUG = False

    SECRET_KEY = 'the quick brown fox jumps over the lazy dog'
    
    SQLALCHEMY_DATABASE_URI = 'sqlite:///db.sqlite'
    SQLALCHEMY_COMMIT_ON_TEARDOWN = True
    UPLOAD_FOLDER = 'uploads'
    UPLOAD_URL = "https://"+bucket_name+".s3.us-east-2.amazonaws.com/"
    MAIL_SUPPRESS_SEND = False
    MAIL_DEBUG = True
    MAIL_SERVER = mail_server
    MAIL_PORT = mail_port
    MAIL_USERNAME = mail_username
    MAIL_PASSWORD = mail_password
    MAIL_USE_TLS = 1
    launch_url = "http://localhost:3000/"
    REDIRECT_URI="http://localhost:3000/"

    #SHIPPING
    SHIP_ADDRESS = shipping_address
    SHIP_CITY = shipping_city
    SHIP_STATE = shipping_state
    SHIP_ZIP = shipping_zip

    SESSION_COOKIE_SECURE = False













