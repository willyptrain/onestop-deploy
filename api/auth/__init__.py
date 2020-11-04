import os
import time
from flask import Flask, request, jsonify, g, render_template
from flask_sqlalchemy import SQLAlchemy
from flask_httpauth import HTTPBasicAuth
import jwt
from werkzeug.security import generate_password_hash, check_password_hash
from werkzeug.utils import secure_filename
import datetime  
from sqlalchemy import func
import boto3
from flask_mail import Mail, Message
from .settings import access_key_id, secret_access_key, acl, bucket_name, bucket_region
from .email_settings import mail_server, mail_port, mail_username, mail_password
from .shipping_settings import shipping_address, shipping_zip, shipping_city, shipping_state
from .stripe_config import stripe_publishable, stripe_secret
import stripe
from flask_login import logout_user, login_user, LoginManager, login_required, UserMixin
import json
from flask_migrate import Migrate
from sqlalchemy.dialects.postgresql import UUID
import uuid
from .config import DevelopmentConfig 
from auth.routes import app

app = app