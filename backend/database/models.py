from flask_bcrypt import generate_password_hash, check_password_hash
from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

class User(db.Model):
    id = db.Column(db.Integer(), primary_key=True)
    username = db.Column(db.String(255), nullable=False, unique=True)
    password = db.Column(db.String(255), nullable=False)
    first_name = db.Column(db.String(255), nullable=False)
    last_name = db.Column(db.String(255), nullable=False)
    email = db.Column(db.String(255), nullable=False, unique=True)
    phone_number = db.Column(db.String(255))

    def hash_password(self):
        self.password = generate_password_hash(self.password).decode('utf8')

    def check_password(self, password):
        return check_password_hash(self.password, password)

    def __repr__(self):
        return self.username

class Album(db.Model):
    id = db.Column(db.Integer(), primary_key=True)
    title = db.Column(db.String(255), nullable=False)
    latitude = db.Column(db.Integer(), nullable=False)
    longitude = db.Column(db.Integer(), nullable=False)
    continent = db.Column(db.String(255))
    all_days_in_same_country = db.Column(db.Boolean(), nullable=False)
    country = db.Column(db.String(255))
    all_days_in_same_region_or_state = db.Column(db.Boolean(), nullable=False)
    region_or_state = db.Column(db.String(255))
    all_days_in_same_city = db.Column(db.Boolean(), nullable=False)
    city = db.Column(db.String(255))
    year = db.Column(db.Integer(), nullable=False)
    month = db.Column(db.String(255), nullable=False)
    day = db.Column(db.Integer(), nullable=False)
    private = db.Column(db.Boolean(), nullable=False)
    user_id = db.Column(db.Integer(), db.ForeignKey('user.id'), nullable=False)
    days = db.relationship('Day')

class Day(db.Model):
    id = db.Column(db.Integer(), primary_key=True)
    entry = db.Column(db.Text())
    country = db.Column(db.String(255))
    state = db.Column(db.String(255))
    city = db.Column(db.String(255))
    day_on_trip = db.Column(db.Integer(), nullable=False)
    album_id = db.Column(db.Integer(), db.ForeignKey('album.id'), nullable=False)
    photos = db.relationship('Photos')


class Photo(db.Model):
    id = db.Column(db.Integer(), primary_key=True)
    filename = db.Column(db.String(255), nullable=False)
    file_location = db.Column(db.Text(), nullable=False)
    caption = db.Column(db.Text())
    day_id = db.Column(db.Integer(), db.ForeignKey('day.id'), nullable=False)
    tags = db.relationship('Tag')

class Tag(db.Model):
    id = db.Column(db.Integer(), primary_key=True)
    photo_id = db.Column(db.Integer(), db.ForeignKey('photo.id'), nullable=False)
    user_id = db.Column(db.Integer(), db.ForeignKey('user.id'))
    friend_first_name = db.Column(db.String(255))
    friend_last_name = db.Column(db.String(255))
    tagged_user = db.relationship('User')


class Request(db.Model):
    id = db.Column(db.Integer(), primary_key=True)
    request = db.Column(db.String(255), nullable=False)
    status = db.Column(db.String(255), nullable=False)
    user_id = db.Column(db.Integer(), db.ForeignKey('user.id'), nullable=False)
    requester_id = db.Column(db.Integer(), db.ForeignKey('user.id'), nullable=False)
    requester = db.relationship('User')

class Friend(db.Model):
    user_id = db.Column(db.Integer(), db.ForeignKey('user.id'))
    friend_id = db.Column(db.Integer(), db.ForeignKey('user.id'))
    friend = db.relationship('User')

    __table_args__ = (
    db.PrimaryKeyConstraint(
        user_id, friend_id,
        ),
    )