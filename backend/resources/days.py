from flask import request
from flask_jwt_extended import jwt_required, get_jwt_identity, verify_jwt_in_request
from flask_restful import Resource
from database.models import db, Day
from database.schemas import day_schema, days_schema

class Days(Resource):
    @jwt_required()
    def post(self):
        user_id = get_jwt_identity()
        form_data = request.get_json()
        new_day = day_schema.load(form_data)
        new_day.user_id = user_id
        db.session.add(new_day)
        db.session.commit()
        return day_schema.dump(new_day), 201

    @jwt_required()
    def get(self):
        user_id = get_jwt_identity()
        user_days = Day.query.filter_by(user_id=user_id)
        return days_schema.dump(user_days), 200

class IndividualDay(Resource):
    @jwt_required()
    def get(self, day_id):
        user_id = get_jwt_identity()
        day = Day.query.get_or_404(day_id)
        return day_schema.dump(day), 200

    @jwt_required()
    def delete(self, day_id):
        user_id = get_jwt_identity()
        day = Day.query.get_or_404(day_id)
        db.session.delete(day)
        db.session.commit()
        return day_schema.dump(day), 204

    @jwt_required()
    def patch(self, day_id):
        user_id = get_jwt_identity()
        form_data = request.get_json()
        day = Day.query.get_or_404(day_id)
        day.day_on_trip = form_data['day_on_trip']
        db.session.commit()
        return day_schema.dump(day), 200

    @jwt_required()
    def put(self, day_id):
        user_id = get_jwt_identity()
        form_data = request.get_json()
        day = Day.query.get_or_404(day_id)

        day.entry = form_data['entry']
        day.country  = form_data['country']
        day.state = form_data['state']
        day.city = form_data['city']
        day.day_on_trip = form_data['day_on_trip']

        db.session.commit()
        return day_schema.dump(day), 200