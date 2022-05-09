from app import db
from werkzeug.security import generate_password_hash, check_password_hash

class Buku(db.Model):
    __tablename__ = 'tbuku'
    id = db.Column(db.String(4), primary_key=True)
    judul = db.Column(db.String(40), unique=True)
    penulis = db.Column(db.String(25))
    penerbit = db.Column(db.String(30))

    def __init__(self, id, judul, penulis, penerbit):
        self.id = id
        self.judul = judul
        self.penerbit = penerbit
        self.penulis = penulis

    def __repr__(self):
        return '[%s, %s, %s, %s]' % \
            (self.id, self.judul, self.penulis, self.penerbit)

class User(db.Model):
    __tablename__ = 'tuser'
    id = db.Column(db.String(4), primary_key=True)
    name = db.Column(db.String(30))
    username = db.Column(db.String(12), unique=True)
    password = db.Column(db.String(32))

    def __init__(self, id, name, username, password):
        self.id = id
        self.name = name
        self.username = username
        self.password = generate_password_hash(password)

    def check_password(self, password):
        return check_password_hash(self.password, password)   

    def __repr__(self):
        return '[%s, %s, %s, %s]' % \
            (self.id, self.name, self.username, self.password)