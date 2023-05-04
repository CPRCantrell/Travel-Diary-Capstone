from flask import request
from flask_jwt_extended import jwt_required, get_jwt_identity, verify_jwt_in_request
from flask_restful import Resource
from database.models import db, Friend, User, Request
from database.schemas import friend_schema, friends_schema

class Friend(Resource):
    @jwt_required()
    def get(self):
        user_id = get_jwt_identity()
        friends = Friend.query.get_or_404(user_id=user_id)
        return friends_schema.dump(friends), 200

class FindFriends(Resource):
    @jwt_required()
    def get(self):
        user_id = get_jwt_identity()
        friends = Friend.query.filter_by(user_id = user_id)
        sent_requests = Request.query.fitler_by(requester_id = user_id)
        recieved_request = Request.query.filter_by(user_id = user_id)
        users = User.query.all()
        response = []
        for user in users:
            friend_status = 'not_friend'
            for friend in friends:
                if(user.id == user_id or friend.friend_id == user.id):
                    friend_status = 'already_friend'
            for sent in sent_requests:
                if(user.id == sent.user_id and sent.request == 'friend'):
                    friend_status = 'pending_friend'
            for recieved in recieved_request:
                if(user.id == recieved.requester_id and recieved.request == 'friend'):
                    friend_status = ['waiting_friend']
            response.append({
                'user_id': user.id,
                'username': user.username,
                'first_name': user.first_name,
                'last_name': user.last_name,
                'friend_status': friend_status
            })
        return response, 200