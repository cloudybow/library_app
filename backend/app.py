from flask import Flask, request
from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy         

app = Flask(__name__)
app.config['SECRET_KEY'] = '@#$123456&*()'
app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql://root:''@localhost/dblibrary'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = True
db = SQLAlchemy(app)
CORS(app)

from model import Buku, User

@app.route('/')
def index():
    msg = 'Hello World!'
    return msg

@app.route('/login',methods=["POST"])
def login():
    username = request.json.get("username",None)
    password = request.json.get("password",None)

    user = User.query.filter_by(username = username).first()
    res = user.check_password(password)
    if res:
        return {"msg": "Wrong email or password"}, 401
    else:
        response = {
            "status":True,
            "name":user.name,
            "msg": "success!",
            "id":user.id
        }
        return response

@app.route('/profile/<id>',methods=["GET"])
def profile(id):
    user = User.query.filter_by(id = id).first()
    if user is None:
        return {"msg": "User doesn't exist, login first!"}, 401

    response = {
        "username":user.username,
        "name":user.name,
    }
    return response

@app.route('/register',methods=["POST"])
def register():
    last_id = User.query.order_by(User.id.desc()).first()
    if last_id is None:
        last_id.id = 0

    id = last_id.id+1
    name = request.json.get("name",None)
    username = request.json.get("username",None)
    password = request.json.get("password",None)
    user = User(id,name,username,password)
    db.session.add(user)
    db.session.commit()

    return {
        "msg":"Success!"
    }

@app.route('/editProfile/<id>',methods=["POST"])
def editProfile(id):
    user = User.query.filter_by(id = id).first()
    user.username = request.json.get("username",None)
    user.name = request.json.get("name",None)
    db.session.add(user)
    db.session.commit()

    print(user)
    return {
        "msg":"success!"
    }

if __name__ == '__name__':
    app.run(debug=True)