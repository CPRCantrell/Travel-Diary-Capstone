import os
from flask import request, redirect
from flask_jwt_extended import jwt_required, get_jwt_identity, verify_jwt_in_request
from flask_restful import Resource
from database.models import db, Photo, Album
from database.schemas import photo_schema, photos_schema
from werkzeug.utils import secure_filename
import uuid

class Photos(Resource):
    @jwt_required()
    def post(self):
        user_id = get_jwt_identity()
        file = request.files.get('photo')
        filename = str(uuid.uuid4()) +'.'+ file.filename.split('.')[-1]
        target = os.path.join('C:/Users/Chris/Desktop/DevCodeCamp/Projects/CapStone -Travel Diary/Travel Diary/frontend/src/assests/uploads/', filename)
        file.save(target)
        new_photo = photo_schema.load(request.form)
        new_photo.file_location = target
        db.session.add(new_photo)
        db.session.commit()
        return photo_schema.dump(new_photo), 201

    @jwt_required()
    def get(self):
        user_id = get_jwt_identity()
        albums = Album.query.filter_by(user_id=user_id)
        photos = []
        for album in albums:
            for day in album.days:
                user_photos = Photo.query.filter_by(day_id=day.id)
                photos.extend(photos_schema.dump(user_photos))
        return photos, 200

class IndividualPhoto(Resource):
    @jwt_required()
    def get(self, photo_id):
        user_id = get_jwt_identity()
        photo = Photo.query.get_or_404(photo_id)
        return photo.file_location, 200

    @jwt_required()
    def delete(self, photo_id):
        user_id = get_jwt_identity()
        photo = Photo.query.get_or_404(photo_id)
        db.session.delete(photo)
        db.session.commit()
        return "successful", 200

    @jwt_required()
    def patch(self, photo_id):
        user_id = get_jwt_identity()
        form_data = request.get_json()
        photo = Photo.query.get_or_404(photo_id)
        if form_data["update"] == "caption":
            photo.caption = form_data["caption"]
        else:
            photo.private = form_data["private"]
        db.session.commit()
        return photo_schema.dump(photo), 200