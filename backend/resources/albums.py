from flask import request
from flask_jwt_extended import jwt_required, get_jwt_identity, verify_jwt_in_request
from flask_restful import Resource
from database.models import db, Album
from database.schemas import album_schema, albums_schema
from sqlalchemy import and_

class Albums(Resource):
    @jwt_required()
    def post(self):
        user_id = get_jwt_identity()
        form_data = request.get_json()
        new_album = album_schema.load(form_data)
        new_album.user_id = user_id
        db.session.add(new_album)
        db.session.commit()
        return album_schema.dump(new_album), 201

    @jwt_required()
    def get(self):
        user_id = get_jwt_identity()
        user_albums = Albums.query.filter_by(user_id=user_id)
        return albums_schema.dump(user_albums), 200

class IndividualAlbum(Resource):
    @jwt_required()
    def get(self, album_id):
        user_id = get_jwt_identity()
        album = Albums.query.get((album_id,user_id))
        return album_schema.dump(album), 200

    @jwt_required()
    def delete(self, album_id):
        user_id = get_jwt_identity()
        album = Albums.query.get((album_id,user_id))
        db.session.delete(album)
        db.session.commit()
        return album_schema.dump(album), 204

    @jwt_required()
    def patch(self, album_id):
        user_id = get_jwt_identity()
        form_data = request.get_json()
        album = Albums.query.get((album_id,user_id))
        album.private = form_data['private']
        db.session.commit()
        return album_schema.dump(album), 200

    @jwt_required()
    def put(self, album_id):
        user_id = get_jwt_identity()
        form_data = request.get_json()
        album = Album.query.get((album_id,user_id))

        album.title = form_data['title']
        album.latitude  = form_data['latitude']
        album.longitude = form_data['longitude']
        album.continent = form_data['continent']
        album.all_days_in_same_country = form_data['all_days_in_same_country']
        album.country = form_data['country']
        album.all_days_in_same_region_or_state = form_data['all_days_in_same_region_or_state']
        album.region_or_state = form_data['region_or_state']
        album.all_days_in_same_city = form_data['all_days_in_same_city']
        album.city = form_data['city']
        album.year = form_data['year']
        album.month = form_data['month']
        album.day = form_data['day']

        db.session.commit()
        return album_schema.dump(album), 200