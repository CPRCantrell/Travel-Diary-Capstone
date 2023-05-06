from flask import request
from flask_jwt_extended import jwt_required, get_jwt_identity, verify_jwt_in_request
from flask_restful import Resource
from database.models import db, Album, User
from database.schemas import album_schema, albums_schema

class Albums(Resource):
    @jwt_required()
    def post(self):
        user_id = get_jwt_identity()
        form_data = request.get_json()
        new_album = album_schema.load(form_data)
        user = User.query.get_or_404(user_id)
        new_album.users.append(user)
        db.session.add(new_album)
        db.session.commit()
        return album_schema.dump(new_album), 201

    @jwt_required()
    def get(self):
        user_id = get_jwt_identity()
        user = User.query.get_or_404(user_id)
        return albums_schema.dump(user.albums), 200

class IndividualAlbum(Resource):
    @jwt_required()
    def get(self, album_id):
        user_id = get_jwt_identity()
        album = Album.query.get_or_404(album_id)
        return album_schema.dump(album), 200

    @jwt_required()
    def delete(self, album_id):
        user_id = get_jwt_identity()
        album = Album.query.get_or_404(album_id)
        db.session.delete(album)
        db.session.commit()
        return "successful", 204

    @jwt_required()
    def patch(self, album_id):
        user_id = get_jwt_identity()
        form_data = request.get_json()
        album = Album.query.get_or_404(album_id)
        if(form_data.get('current_trip') != None):
            album.current_trip = form_data['current_trip']
        if(form_data.get('private') != None):
            album.private = form_data['private']
        db.session.commit()
        return album_schema.dump(album), 200

    @jwt_required()
    def put(self, album_id):
        user_id = get_jwt_identity()
        form_data = request.get_json()
        album = Album.query.get_or_404(album_id)


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

class AlbumsForFriends(Resource):
    @jwt_required()
    def get(self, username):
        user_id = get_jwt_identity()
        see_user = User.query.filter_by(username = username).first()
        allowedAlbums = albums_schema.dump(see_user.albums)

        checked_album = 0
        while( len(allowedAlbums) > checked_album):
                if allowedAlbums[checked_album]['private']:
                    allowedAlbums.pop(checked_album)
                    checked_album -= 1
                else :
                    for day in range(len(allowedAlbums[checked_album]['days'])):
                        checked_photos = 0
                        while(len(allowedAlbums[checked_album]['days'][day]['photos']) > checked_photos):
                            if allowedAlbums[checked_album]['days'][day]['photos'][checked_photos]['private']:
                                allowedAlbums[checked_album]['days'][day]['photos'].pop(checked_photos)
                                checked_photos -= 1
                            checked_photos += 1
                checked_album += 1

        return allowedAlbums, 200

class AlbumForFriend(Resource):
    @jwt_required()
    def get(self, username, album_id):
        user_id = get_jwt_identity()
        see_album = Album.query.get_or_404(album_id)
        filtered = album_schema.dump(see_album)
        for day in range(len(filtered['days'])):
            checked_photos = 0
            while(len(filtered['days'][day]['photos']) > checked_photos):
                if filtered['days'][day]['photos'][checked_photos]['private']:
                    filtered['days'][day]['photos'].pop(checked_photos)
                    checked_photos -= 1
                checked_photos += 1

        return filtered, 200
