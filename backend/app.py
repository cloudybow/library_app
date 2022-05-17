from flask import Flask, request, jsonify
from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy         

app = Flask(__name__)
app.config['SECRET_KEY'] = '@#$123456&*()'
app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql://root:''@localhost/dblibrary'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = True
db = SQLAlchemy(app)
CORS(app)

from model import Buku, User, Role

@app.route('/')
def index():
    msg = 'Hello World!'
    return msg

#USER SECTION#
#USER LOGIN#
@app.route('/login',methods=["POST"])
def login():
    username = request.json.get("username",None)
    password = request.json.get("password",None)

    user = User.query.filter_by(username = username).first()
    res = user.check_password(password)
    if res:
        return {"msg": "Wrong email or password"}, 401
    else:
        role = Role.query.filter_by(id = user.id_role).first()
        response = {
            "status":True,
            "name":user.name,
            "msg": "success!",
            "id":user.id,
            "role":role.role
        }
        return response

#USER ROLE#
@app.route('/getRole',methods=["POST"])
def getRole():
    name = request.json.get("name",None)
    print(name)
    res = User.query.filter_by(name = name).first()
    role = Role.query.filter_by(id = res.id_role).first()

    if role.role == 'User':
        return {
            "error":True,
            "msg":"Access Denied!"
        }, 401
    else:
        return {
            "role":role.role
        }

#USER REGISTER#
@app.route('/register',methods=["POST"])
def register():
    last_id = User.query.order_by(User.id.desc()).first()
    if last_id is None:
        last_id.id = 0

    id = last_id.id+1
    name = request.json.get("name",None)
    username = request.json.get("username",None)
    password = request.json.get("password",None)
    role = request.json.get("role",None)
    user = User(id,name,username,password,role)
    db.session.add(user)
    db.session.commit()

    return {
        "msg":"Success!"
    }

#USER PROFILE#
@app.route('/profile/<id>',methods=["GET"])
def profile(id):
    user = User.query.filter_by(id = id).first()
    if user is None:
        return {"msg": "User doesn't exist, login first!"}, 401
    role = Role.query.filter_by(id = user.id_role).first()
    response = {
        "username":user.username,
        "name":user.name,
        "role": role.role
    }
    return response

#USER PROFILE EDIT#
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
#END OF USER SECTION#

#BOOK SECTION#
#FETCH ALL BOOK#
@app.route('/allBook',methods=["GET"])
def allBook():
    book = Buku.query.all()
    list_data = []
    if book is None:
        return {"msg": "Problem Connecting to the Server"}, 401

    for b in book:
        data = b.__dict__
        data.pop('_sa_instance_state', None)
        list_data.append(data)

    print(list_data)
    response = {
        "data":list_data
    }
    return jsonify(response)

#END OF BOOK SECTION#
if __name__ == '__name__':
    app.run(debug=True)