from flask_marshmallow import Marshmallow
from marshmallow import post_load, fields
from database.models import User, Album, Day, Photo, Tag, Request, Friend, Notification

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
    class Meta:
        fields = ("id", "username", "first_name", "last_name", "email")

register_schema = RegisterSchema()
user_schema = UserSchema()
users_schema = UserSchema(many=True)

class UserFriendSchema(ma.Schema):
    id = fields.String()
    username = fields.String(required=True)
    first_name = fields.String(required=True)
    last_name = fields.String(required=True)

    class Meta:
        fields = ("id","username", "first_name", "last_name")

user_friend_schema = UserFriendSchema()
users_friend_schema = UserFriendSchema(many=True)

class TagSchema(ma.Schema):
    id = fields.Integer(primary_key=True)
    photo_id = fields.Integer(required=True)
    user_id = fields.Integer()
    friend_without_user_id = fields.String()
    tagged_user = ma.Nested(UserFriendSchema, many=False)

    class Meta:
        fields = ('id', 'photo_id', 'user_id', 'friend_without_user_id', 'tagged_user')

    @post_load
    def create_tag(self, data, **kwargs):
        return Tag(**data)

tag_schema = TagSchema()
tags_schema = TagSchema(many=True)

class PhotoSchema(ma.Schema):
    id = fields.Integer(primary_key=True)
    filename = fields.String()
    caption = fields.String()
    day_id = fields.Integer()
    private = fields.Boolean(required=True)
    tags = ma.Nested(TagSchema, many=True)


    class Meta:
        fields = ('id', 'file_location', 'caption', 'day_id', 'private','tags')

    @post_load
    def create_photo(self, data, **kwargs):
        return Photo(**data)

photo_schema = PhotoSchema()
photos_schema = PhotoSchema(many=True)

class DaySchema(ma.Schema):
    id = fields.Integer(primary_key=True)
    entry = fields.String()
    country = fields.String()
    state = fields.String()
    city = fields.String()
    day_on_trip = fields.Integer(required=True)
    day_complete = fields.Boolean()
    album_id = fields.Integer(required=True)
    photos = ma.Nested(PhotoSchema, many=True)

    class Meta:
        fields = ('id', 'entry', 'country', 'state', 'city', 'day_on_trip', 'day_complete', 'album_id', 'photos')

    @post_load
    def create_day(self, data, **kwargs):
        return Day(**data)

day_schema = DaySchema()
days_schema = DaySchema(many=True)

class AlbumSchema(ma.Schema):
    id = fields.Integer(primary_key=True)
    title = fields.String(required=True)
    latitude = fields.Float(required=True)
    longitude = fields.Float(required=True)
    region = fields.String()
    all_days_in_same_country = fields.Boolean(required=True)
    country = fields.String()
    all_days_in_same_city = fields.Boolean(required=True)
    city = fields.String()
    state = fields.String()
    year = fields.Integer(required=True)
    month = fields.String(required=True)
    day = fields.Integer(required=True)
    private = fields.Boolean(required=True)
    corrent_trip = fields.Boolean()
    cover_image = fields.Integer()
    days = ma.Nested(DaySchema, many=True)
    users = ma.Nested(UserFriendSchema, many=True)

    class Meta:
        fields = ('id', 'title', 'latitude', 'longitude', 'region', 'all_days_in_same_country', 'country', 'all_days_in_same_region_or_state', 'region_or_state', 'all_days_in_same_city', 'all_days_in_same_city', 'city', 'state', 'year', 'month', 'day', 'private', 'days','cover_image', 'current_trip', 'users')

    @post_load
    def create_album(self, data, **kwargs):
        return Album(**data)

album_schema = AlbumSchema()
albums_schema = AlbumSchema(many=True)

class RequestSchema(ma.Schema):
    id = fields.Integer(primary_key=True)
    request = fields.String(required=True)
    status = fields.String()
    data = fields.String()
    user_id = fields.Integer(required=True)
    requester_id = fields.Integer()
    requester = ma.Nested(UserFriendSchema, many=False)

    class Meta:
        fields = ('id', 'request', 'status', 'data', 'user_id', 'requester_id', 'requester')

    @post_load
    def create_request(self, data, **kwargs):
        return Request(**data)

request_schema = RequestSchema()
requests_schema = RequestSchema(many=True)
class FriendSchema(ma.Schema):
    user_id = fields.Integer()
    friend_id = fields.Integer(required=True)
    friend = ma.Nested(UserFriendSchema, many=False)

    class Meta:
        fields = ('user_id', 'friend_id', 'friend')

    @post_load
    def create_friend(self, data, **kwargs):
        return Friend(**data)

friend_schema = FriendSchema()
friends_schema = FriendSchema(many=True)

class NotificationSchema(ma.Schema):
    id = fields.Integer(primary_key=True)
    user_id = fields.Integer()
    notification = fields.String(required=True)
    navigate = fields.String()

    class Meta:
        fields = ('id','user_id','notification','navigate')

    @post_load
    def create_notification(self, data, **kwargs):
        return Notification(**data)

note_schema = NotificationSchema()
notes_schema = NotificationSchema(many=True)