from database.models import Friend, Notification, User, db
from flask_restful import Resource
from database.schemas import note_schema, notes_schema
from flask_jwt_extended import jwt_required, get_jwt_identity

class Notifications():
    def __init__(self, user_id) -> None:
        self.user = User.query.get_or_404(user_id)
        self.all_friends = Friend.query.filter_by(user_id = user_id)

    def notify_all_friends(self, note):
        for friend in self.all_friends:
            note['user_id'] = friend.friend_id
            self.commit_notification(note)

    def commit_notification(self,note):
        notification = note_schema.load(note)
        db.session.add(notification)
        db.session.commit()

    def request_was(self, request):
        wanted_friend = User.query.get_or_404(request.user_id)
        note = f'Your {request.request} Request to {wanted_friend.username} was {request.status}.'
        self.commit_notification({'user_id':self.user.id,'notification':note})

    def tell_friends_about_day(self, day, album):
        location = (day.city if not album.all_days_in_same_city else album.city) +','
        if(day.state != '' and day.state):
            location += f' {day.state}'
        if(album.state != '' and album.state):
            location += f' {album.state}'
        if(day.country != '' and day.country):
            location += f' {day.country}'
        if(album.all_days_in_same_country):
            location += f' {album.country}'
        note = f'{self.user.first_name} {self.user.last_name} just posted about their {day.day_on_trip if day.day_on_trip != 1  else "First"} day at {location}'
        self.notify_all_friends({'user_id':0,'notification':note,'navigate':f'/album/{self.user.username}/{album.id}'})

class Note(Resource):
    @jwt_required()
    def get(self):
        user_id = get_jwt_identity()
        notifications = Notification.query.filter_by(user_id=user_id)
        return notes_schema.dump(notifications), 200

class IndividualNote(Resource):
    @jwt_required()
    def delete(self, note_id):
        user_id = get_jwt_identity()
        notification = Notification.query.get_or_404(note_id)
        db.session.delete(notification)
        db.session.commit()
        return "success", 200
