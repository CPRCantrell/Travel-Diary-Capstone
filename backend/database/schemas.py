from flask_marshmallow import Marshmallow
from marshmallow import post_load, fields
from database.models import User

ma = Marshmallow()

# Auth Schemas
class RegisterSchema(ma.Schema):
    id = fields.Integer(primary_key=True)
    username = fields.String(required=True)
    password = fields.String(required=True)
    first_name = fields.String(required=True)
    last_name = fields.String(required=True)
    email = fields.String(required=True)
    class Meta:
        fields = ("id", "username",  "password", "first_name", "last_name", "email")

    @post_load
    def create_user(self, data, **kwargs):
        return User(**data)

class UserSchema(ma.Schema):
    id = fields.Integer(primary_key=True)
    username = fields.String(required=True)
    first_name = fields.String(required=True)
    last_name = fields.String(required=True)
    email = fields.String(required=True)
    phone_number = fields.String()
    class Meta:
        fields = ("id", "username", "first_name", "last_name", "email", "phone_number")

register_schema = RegisterSchema()
user_schema = UserSchema()
users_schema = UserSchema(many=True)

class UserFriendSchema(ma.Schema):
    username = fields.String(required=True)
    first_name = fields.String(required=True)
    last_name = fields.String(required=True)

    class Meta:
        fields = ("username", "first_name", "last_name")

user_friend_schema = UserFriendSchema()
users_friend_schema = UserFriendSchema(many=True)

class TagSchema(ma.Schema):
    id = fields.Integer(primary_key=True)
    photo_id = fields.Integer(required=True)
    user_id = fields.Integer(required=True)
    friend_first_name = fields.String()
    friend_last_name = fields.String()
    tagged_user = ma.Nested(UserFriendSchema, many=False)

    class Meta:
        fields = ('id', 'photo_id', 'user_id', 'friend_first_name', 'friend_last_name')

tag_schema = TagSchema()
tags_schema = TagSchema(many=True)

class PhotoSchema(ma.Schema):
    id = fields.Integer(primary_key=True)
    filename = fields.String(required=True)
    file_location = fields.String(required=True)
    caption = fields.String()
    day_id = fields.Integer(required=True)
    private = fields.Boolean(required=True)
    tags = ma.Nested(TagSchema, many=True)


    class Meta:
        fields = ('id', 'filename', 'file_location', 'caption', 'day_id')

photo_schema = PhotoSchema()
photos_schema = PhotoSchema(many=True)

class DaySchema(ma.Schema):
    id = fields.Integer(primary_key=True)
    entry = fields.String()
    country = fields.String()
    state = fields.String()
    city = fields.String()
    day_on_trip = fields.Integer(required=True)
    album_id = fields.Integer(required=True)
    photos = ma.Nested(PhotoSchema, many=True)

    class Meta:
        fields = ('id', 'entry', 'country', 'state', 'city', 'day_on_trip', 'album_id')

day_schema = DaySchema()
days_schema = DaySchema(many=True)

class AlbumSchema(ma.Schema):
    id = fields.Integer(primary_key=True)
    title = fields.String(required=True)
    latitude = fields.Integer(required=True)
    longitude = fields.Integer(required=True)
    continent = fields.String()
    all_days_in_same_country = fields.Boolean(required=True)
    country = fields.String()
    all_days_in_same_region_or_state = fields.Boolean(required=True)
    region_or_state = fields.String()
    all_days_in_same_city = fields.Boolean(required=True)
    city = fields.String()
    year = fields.Integer(required=True)
    month = fields.String(required=True)
    day = fields.Integer(required=True)
    private = fields.Boolean(required=True)
    user_id = fields.Integer(required=True)
    days = ma.Nested(DaySchema, many=True)

    class Meta:
        fields = ('id', 'title', 'latitude', 'longitude', 'continent', 'all_days_in_same_country', 'country', 'all_days_in_same_region_or_state', 'region_or_state', 'all_days_in_same_city', 'all_days_in_same_city', 'city', 'year', 'month', 'day', 'private', 'user_id')

album_schema = AlbumSchema()
albums_schema = AlbumSchema(many=True)

class RequestSchema(ma.Schema):
    id = fields.Integer(primary_key=True)
    request = fields.String(required=True)
    status = fields.String(required=True)
    user_id = fields.Integer(required=True)
    requester_id = fields.Integer(required=True)
    requester = ma.Nested(UserFriendSchema, many=False)

    class Meta:
        fields = ('id', 'request', 'status', 'user_id', 'requester_id')

request_schema = RequestSchema()
requests_schema = RequestSchema(many=True)
class FriendSchema(ma.Schema):
    user_id = fields.Integer(required=True)
    friend_id = fields.Integer(required=True)
    friend = ma.Nested(UserFriendSchema, many=False)

    class Meta:
        fields = ('user_id', 'friend_id')

friend_schema = FriendSchema()
friends_schema = FriendSchema(many=True)