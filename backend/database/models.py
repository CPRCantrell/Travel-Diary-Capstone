from flask_bcrypt import generate_password_hash, check_password_hash
from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

user_album = db.Table('user_table',
                      db.column('user_id', db.Integer(), db.ForeignKey('user.id')),
                      db.column('album_id', db.Integer(), db.ForeignKey('album.id'))
                      )

class User(db.Model):
    id = db.Column(db.Integer(), primary_key=True)
    username = db.Column(db.String(255), nullable=False, unique=True)
    password = db.Column(db.String(255), nullable=False)
    first_name = db.Column(db.String(255), nullable=False)
    last_name = db.Column(db.String(255), nullable=False)
    email = db.Column(db.String(255), nullable=False, unique=True)
    phone_number = db.Column(db.String(255))
    albums = db.relationship('Album', secondary=user_album, backref='posts')

    def hash_password(self):
        self.password = generate_password_hash(self.password).decode('utf8')

    def check_password(self, password):
        return check_password_hash(self.password, password)

    def __repr__(self):
        return self.username

class Album(db.Model):
    id = db.Column(db.Integer(), primary_key=True)
    title = db.Column(db.string(255), nullable=False)
    latitude = db.Column(db.integer(), nullable=False)
    longitude = db.Column(db.integer(), nullable=False)
    continent = db.Column(db.string(255))
    country = db.Column(db.string(255))
    region_or_state = db.Column(db.String(255))
    city = db.Column(db.string(255))
    year = db.Column(db.interger(), nullable=False)
    month = db.Column(db.string(), nullable=False)
    day = db.column(db.integer(), nullable=False)

class Day(db.Model):
    id = db.Column(db.Integer(), primary_key=True)
    entry = db.Column(db.Text())
    country = db.Column(db.string(255))
    state = db.Column(db.string(255))
    city = db.Column(db.String(255), nullable=False)
    day_on_trip = db.Column(db.Interger(), nullable=False)
    album_id = db.Column(db.Integer(), db.ForeignKey('album.id'), nullable=False)


class Photo(db.Model):
    id = db.Column(db.Integer(), primary_key=True)
    filename = db.Column(db.String(255), nullable=False)
    file_location = db.Column(db.Text(), nullable=False)
    caption = db.Column(db.Text())
    day_id = db.Column(db.Integer(), db.ForeignKey('day.id'), nullable=False)

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

class friend(db.Model):
    user_id = db.Column(db.Integer(), db.ForeignKey('user.id'))
    friend_id = db.Column(db.Integer(), db.ForeignKey('user.id'))
    friend = db.relationship('User')

    __table_args__ = (
    db.PrimaryKeyConstraint(
        user_id, friend_id,
        ),
    )