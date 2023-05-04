import os
from flask import Flask
from flask_bcrypt import Bcrypt
from flask_cors import CORS
from flask_jwt_extended import JWTManager
from flask_restful import Api
from flask_migrate import Migrate
from database.models import db
from database.schemas import ma
from resources.auth import LoginResource, RegisterResource
from resources.albums import Albums, IndividualAlbum
from resources.days import Days, IndividualDay
from resources.photos import Photos, IndividualPhoto
from resources.tag import Tags, IndividualTag
from resources.requests import Request
from resources.friends import Friend, FindFriends
from resources.notificatiion import Note, IndividualNote
from dotenv import load_dotenv
from os import environ

# Adds variables from .env file to environment
load_dotenv()

# Creates instances of additional libraries
bcrypt = Bcrypt()
jwt= JWTManager()
cors = CORS()
migrate = Migrate()

def create_app():
    """
    App factory that creates app instance
    """
    # Creates app instance
    app = Flask(__name__)

    # Loads config properties from .env file
    app.config['SQLALCHEMY_DATABASE_URI'] = environ.get('SQLALCHEMY_DATABASE_URI')
    app.config['JWT_SECRET_KEY'] = environ.get('JWT_SECRET_KEY')
    app.config['UPLOAD_FOLDER'] = '/Users/Chris/Desktop/DevCodeCamp/Projects/CapStone -Travel Diary/Travel Diary/backend/static/uploads'

    # Registers all routes with API
    api = create_routes()

    # Registers Flask app with additional libraries created/imported above
    db.init_app(app)
    ma.init_app(app)
    bcrypt.init_app(app)
    jwt.init_app(app)
    cors.init_app(app)
    api.init_app(app)
    migrate.init_app(app, db)

    return app


def create_routes():
    api = Api()
    api.add_resource(RegisterResource, '/api/auth/register')
    api.add_resource(LoginResource, '/api/auth/login')
    api.add_resource(Albums, '/api/albums')
    api.add_resource(IndividualAlbum, '/api/album/<int:album_id>')
    api.add_resource(Days, '/api/days')
    api.add_resource(IndividualDay, '/api/day/<int:day_id>')
    api.add_resource(Photos, '/api/photos')
    api.add_resource(IndividualPhoto, '/api/photo/<int:photo_id>')
    api.add_resource(Tags, '/api/tags')
    api.add_resource(IndividualTag, '/api/tag/<int:tag_id>')
    api.add_resource(Request, '/api/requests')
    api.add_resource(Friend, '/api/friends')
    api.add_resource(FindFriends, '/api/find-friends')
    api.add_resource(Note, '/api/notifications')
    api.add_resource(IndividualNote, '/api/notification/<int:note_id>')
    return api
