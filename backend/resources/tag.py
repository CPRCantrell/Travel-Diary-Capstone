from flask import request
from flask_jwt_extended import jwt_required, get_jwt_identity, verify_jwt_in_request
from flask_restful import Resource
from database.models import db, Tag, Album
from database.schemas import tag_schema, tags_schema

class Tags(Resource):
    @jwt_required()
    def post(self):
        user_id = get_jwt_identity()
        form_data = request.get_json()
        new_tag = tag_schema.load(form_data)
        db.session.add(new_tag)
        db.session.commit()
        return tag_schema.dump(new_tag), 201

    @jwt_required()
    def get(self):
        user_id = get_jwt_identity()
        albums = Album.query.filter_by(user_id=user_id)
        tags = []
        for album in albums:
            for day in album.days:
                for photo in day.photos:
                    user_tags = Tag.query.filter_by(photo_id=photo.id)
                    tags.extend(tags_schema.dump(user_tags))
        return tags, 200

class IndividualTag(Resource):
    @jwt_required()
    def get(self, tag_id):
        user_id = get_jwt_identity()
        tag = Tag.query.get_or_404(tag_id)
        return tag_schema.dump(tag), 200

    @jwt_required()
    def delete(self, tag_id):
        user_id = get_jwt_identity()
        tag = Tag.query.get_or_404(tag_id)
        db.session.delete(tag)
        db.session.commit()
        return "successful", 200