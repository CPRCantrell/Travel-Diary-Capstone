from flask import request
from flask_jwt_extended import jwt_required, get_jwt_identity, verify_jwt_in_request
from flask_restful import Resource
from database.models import db, Friend
from database.schemas import friend_schema, friends_schema

class Friend(Resource):
    @jwt_required()
    def post(self):
        user_id = get_jwt_identity()

        friend_id = request.get_json()
        add_friend = friend_schema.load(friend_id)
        add_friend.user_id = user_id
        db.session.add(add_friend)

        exchange_friendship = {'user_id':add_friend.friend_id,'friend_id':add_friend.user_id}
        exchange_friendship = friend_schema.load(exchange_friendship)
        db.session.add(exchange_friendship)

        db.session.commit()
        return friend_schema.dump(add_friend), 201

    @jwt_required()
    def post(self):
        user_id = get_jwt_identity()
        friends = Friend.query.get_or_404(user_id=user_id)
        return friends_schema.dump(friends), 200