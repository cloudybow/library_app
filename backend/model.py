from app import db
from werkzeug.security import generate_password_hash, check_password_hash
from sqlalchemy import ForeignKey

class Buku(db.Model):
    __tablename__ = 'tbuku'
    id = db.Column(db.String(4), primary_key=True)
    judul = db.Column(db.String(40), unique=True)
    penulis = db.Column(db.String(25))
    penerbit = db.Column(db.String(30))
    stok = db.Column(db.Integer())

    def __init__(self, id, judul, penulis, penerbit, stok):
        self.id = id
        self.judul = judul
        self.penerbit = penerbit
        self.penulis = penulis
        self.stok = stok

    def __repr__(self):
        return '[%s, %s, %s, %s, %s]' % \
            (self.id, self.judul, self.penulis, self.penerbit, self.stok)

class User(db.Model):
    __tablename__ = 'tuser'
    id = db.Column(db.Integer(), primary_key=True)
    name = db.Column(db.String(30))
    username = db.Column(db.String(12), unique=True)
    password = db.Column(db.String(32))
    id_role = db.Column(db.Integer, ForeignKey('trole.id_role'))

    def __init__(self, id, name, username, password, id_role):
        self.id = id
        self.name = name
        self.username = username
        self.password = generate_password_hash(password)
        self.id_role = role

    def check_password(self, password):
        return check_password_hash(self.password, password)   

    def __repr__(self):
        return '[%s, %s, %s, %s, %s]' % \
            (self.id, self.name, self.username, self.password, self.id_role)

class Role(db.Model):
    __tablename__ = 'trole'
    id = db.Column(db.Integer, primary_key=True)
    role = db.Column(db.String(30))

    def __init__(self, id, role):
        self.id = id
        self.role = role

    def __repr__(self):
        return '[%s, %s]' % \
            (self.id, self.role)