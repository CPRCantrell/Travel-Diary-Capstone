from flask import request
from flask_jwt_extended import jwt_required, get_jwt_identity, verify_jwt_in_request
from flask_restful import Resource
from database.models import db, Request
from database.schemas import request_schema, requests_schema

class Request(Resource):
    @jwt_required()
    def post(self):
        requester_id = get_jwt_identity()
        form_data = request.get_json()
        new_request = request_schema.load(form_data)
        new_request.requester_id = requester_id
        db.session.add(new_request)
        db.session.commit()
        return request_schema.dump(new_request), 201

    @jwt_required()
    def get(self):
        user_id = get_jwt_identity()
        user_requests = Request.query.filter_by(user_id=user_id)
        return requests_schema.dump(user_requests), 200

class IndividualRequest(Resource):
    @jwt_required()
    def patch(self, request_id):
        user_id = get_jwt_identity()
        status = request.get_json()
        update_request_status = Request.query.get_or_404(request_id)
        update_request_status.status = status['status']
        db.session.commit()
        return request_schema.dump(update_request_status), 200

    @jwt_required()
    def delete(self, request_id):
        user_id = get_jwt_identity()
        delete_request = Request.query.get_or_404(request_id)
        db.session.delete(delete_request)
        db.session.commit()
        return "successful", 204