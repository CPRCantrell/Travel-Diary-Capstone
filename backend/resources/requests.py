from flask import request
from flask_jwt_extended import jwt_required, get_jwt_identity, verify_jwt_in_request
from flask_restful import Resource
from database.models import db, Request
from database.schemas import request_schema, requests_schema, friend_schema
from sqlalchemy import and_
from util.logger import logger
from .notification import Notification

class Requests(Resource):
    @jwt_required()
    def post(self):
        requester_id = get_jwt_identity()
        form_data = request.get_json()
        new_request = request_schema.load(form_data)
        new_request.requester_id = requester_id
        db.session.add(new_request)
        db.session.commit()
        logger.log_request(new_request)
        return request_schema.dump(new_request), 201

    @jwt_required()
    def get(self):
        user_id = get_jwt_identity()
        user_requests = Request.query.filter_by(user_id=user_id)
        return requests_schema.dump(user_requests), 200

    @jwt_required()
    def patch(self):
        user_id = get_jwt_identity()
        status = request.get_json()
        update_request_status = Request.query.filter(and_(user_id=user_id, requester_id=status['requester_id'], request=status['request'], status='pending')).first()
        update_request_status.status = status['status']
        db.session.commit()
        logger.log_request(update_request_status)
        if update_request_status.status == 'approved' or update_request_status.status == 'declined':
            try:
                note = Notification(update_request_status.requester_id)
                note.friend_request_was(update_request_status)
                if update_request_status.status == 'approved':
                    self.set_friend({'user_id':update_request_status.user_id,'friend_id':update_request_status.requester_id})
                self.delete_request(update_request_status)
            except: print('issues in reques patch accept/decline')
        return 'Success', 200

    def set_friend(friend_info):
        add_friend = friend_schema.load(friend_info)
        db.session.add(add_friend)

        exchange_friendship = {'user_id':add_friend.friend_id,'friend_id':add_friend.user_id}
        exchange_friendship = friend_schema.load(exchange_friendship)
        db.session.add(exchange_friendship)

        db.session.commit()

    def delete_request(self, del_request):
        del_request = Request.query.get_or_404(del_request.id)
        db.session.delete(del_request)
        db.session.commit()