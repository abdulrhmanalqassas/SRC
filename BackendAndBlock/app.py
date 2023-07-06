import datetime as date
import json
import os
import random
import string
from datetime import datetime
from functools import wraps

import jwt
from flask import (
    Blueprint,
    Flask,
    Response,
    current_app,
    jsonify,
    render_template,
    request,
)
from flask_cors import CORS, cross_origin
from flask_mail import Mail, Message
from flask_sqlalchemy import SQLAlchemy
from marshmallow import Schema, ValidationError, fields
from web3.exceptions import InvalidAddress
from werkzeug.exceptions import InternalServerError
from werkzeug.security import check_password_hash, generate_password_hash

from compile_sol import (
    deploy_contract,
    get_contract_interface,
    get_Product_Contract_Interface,
)
from compile_solidity_utils import w3

blueprint = Blueprint("blueprint", __name__)
app = Flask(__name__)
CORS(app, supports_credentials=True)
app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///" + "blockchain.db"
app.secret_key = "hze6EPcv0fN_81Bj-nA3d6f45a5fc12445dbac2f59c3b6c7c309f02079d"
db = SQLAlchemy(app)
DOMAIN = "http://localhost:3000/"
reset_password_url = DOMAIN + "resetPassword?token="

app.config['MAIL_SERVER']='smtp.gmail.com'
app.config['MAIL_PORT'] = 587
app.config['MAIL_USERNAME'] = 'ammarhamed64@gmail.com'
app.config['MAIL_PASSWORD'] = 'fakemake'
app.config['MAIL_USE_TLS'] = True


mail = Mail(app)



@app.before_first_request
def create_tables():
    db.create_all()


def random_ID(length):
    letters = string.ascii_lowercase
    return "".join(random.choice(letters) for i in range(length))


class Users(db.Model):
    __tablename__ = "Users"

    id = db.Column(db.Integer, primary_key=True, index=True)

    id_code = db.Column(db.String(25), unique=True)

    name = db.Column(db.String(50), unique=False)

    email = db.Column(db.String(50), unique=True)

    password = db.Column(db.String(256), unique=False)

    user_role = db.Column(db.String(16))

    @classmethod
    def authenticate(cls, **kwargs):
        email = kwargs.get("email")
        password = kwargs.get("password")
        print(email)
        print(password)
        if not email or not password:
            return None

        user = cls.query.filter_by(email=email).first()
        print(user)
        if not user or not check_password_hash(user.password, password):
            return None

        return user

    def __init__(self, email, password, name, id_code):
        self.email = email
        self.password = generate_password_hash(password, method="sha256")
        self.name = name
        self.id_code = id_code

    def to_dict(self):
        return dict(id_code=self.id_code, email=self.email, name=self.name)



class Product(db.Model):
    __tablename__ = "Product"
    id = db.Column(db.String(256), primary_key=True, index=True)
    userId = db.Column(db.String(25), db.ForeignKey(Users.id))
    contract_address = db.Column(db.String(256), unique=False)


# method decorator for token requirements
def token_required(f):
    @wraps(f)
    def _verify(*args, **kwargs):
        print("from decorator ")
        auth_headers = request.headers.get("Authorization", "").split()
        print(auth_headers)

        invalid_msg = {
            "message": "Invalid token. Registeration and / or authentication required",
            "authenticated": False,
        }
        expired_msg = {
            "message": "Expired token. Reauthentication required.",
            "authenticated": False,
        }

        if len(auth_headers) != 2:
            return jsonify(invalid_msg), 401

        try:
            token = auth_headers[1]
            print(token)
            data = jwt.decode(
                token, current_app.config["SECRET_KEY"], algorithms=["HS256"]
            )
            print("this is user data ")
            print(data["sub"])
            user = Users.query.filter_by(email=data["sub"]).first()
            print(user)
            if not user:
                raise RuntimeError("User not found")
            print("iam here ")
            return f(user)
        except (jwt.ExpiredSignatureError):
            return (
                jsonify(expired_msg),
                403,
            )  # 403 FORBIDDEN, means i understand your req but there is an auth problem
        except  jwt.InvalidTokenError: 
            return (jsonify(expired_msg),
                401
                )

        except (Exception) as e:
            print("error ecures here ")
            print(e)
            return (
                jsonify({"message": "%s"%e}),
                500,
            )  
        return f(*args, **kwargs)

    return _verify


# this function is only for test porpuse, it is used for testing the auth system
@app.route("/", methods=("GET",))
@token_required
def HI(current_user):
    if(current_user):
        return jsonify({"message": "DONE ", "authenticated": True}), 200
    return jsonify({"message": "FAILED   ", "authenticated": False }), 400


@app.route("/v1/auth/refresh/", methods=("GET",))
def refreshAccessToken():
    refreshToken = request.cookies.get("refresh_token")
    print("refresh token ")
    print(refreshToken)
    userData = decodeToken(refreshToken)
    if userData == None:
        return (
            jsonify({"message": "RefreshToken is invalid ", "authenticated": False}),
            403,
        )

    # return new access token
    print(userData)
    response = jsonify({"accessToken": getNewAccessToken(userData)}), 200
    return response


@app.route("/v1/auth/signIn/", methods=("POST",))
def login():
    data = request.get_json()
    user = Users.authenticate(**data)
    if not user:
        return jsonify({"message": "Invalid credentials", "authenticated": False}), 401

    token = getNewAccessToken(user.email)

    response = jsonify(
        {
            "accessToken": token,
            "name": user.name,
            "email": user.email,
            "id_code": user.id_code,
        }
    )

    response.set_cookie(
        "refresh_token",
        value=getNewRefreshToken(user),
        httponly=True,
        secure=True,
        samesite="none",
    )

    return response


def getNewRefreshToken(user):
    token = jwt.encode(
        {
            "sub": user.email,
            "iat": datetime.utcnow(),
            "exp": datetime.utcnow() + date.timedelta(minutes=100),
        },
        current_app.config["SECRET_KEY"],
    )
    print(token)
    return token


def getNewAccessToken(userEmail):
    token = jwt.encode(
        {
            "sub": userEmail,
            "iat": datetime.utcnow(),
            "exp": datetime.utcnow() + date.timedelta(minutes=100),
        },
        current_app.config["SECRET_KEY"],
        algorithm="HS256"
    )
    return token


def decodeToken(token):
    print("this is token sent ")
    print(token)
    try:
        data = jwt.decode(
            token, key=current_app.config["SECRET_KEY"], algorithms=["HS256"]
        )

        return data["sub"]
    except jwt.ExpiredSignatureError as e:
        print(e)
        return None
    except (jwt.InvalidTokenError, Exception) as e:
        print(e)
        return None


@app.route("/v1/auth/signUp/", methods=("POST",))
@cross_origin()
def register():
    data = request.get_json()
    user_data = {
        "id_code": data.get("id_code", random_ID(100)),
        "name": data.get("name", ""),
        "email": data.get("email"),
        "password": data.get("password"),
    }
    if None in user_data.values():
        return {"message": "Missing/extra parameters"}, 400
    if not Users.query.filter_by(email=data.get("email")).first():
        user = Users(**user_data)
        db.session.add(user)
        db.session.commit()

        result = user.to_dict()

        return jsonify(result), 201  # CREATED
    else:
        return {"message": "User already exists"}, 409


@app.route("/v1/auth/forgot-password/", methods=("POST",))
@cross_origin()
def forgot_password():
    try:
        body = request.get_json()
        email = body.get("email")
        if not email:
            return "Unprocessable entity", 422

        user = Users.query.filter_by(email=email).first()
        if not user:
            return "User Does Not exist ", 422
        reset_token = jwt.encode(
            {
                "sub": user.email,
                "iat": datetime.utcnow(),
                "exp": datetime.utcnow() + date.timedelta(hours=24),
            },
            current_app.config["SECRET_KEY"],
        )
        print("above")
        print(user.email)
        url = reset_password_url + reset_token
        tempPass = "admin23!2#%s$hash123798" %(user.name )
        msg = Message(subject = "Forgot your password?",sender='no-reply@gmail.com',  recipients=[user.email])
        msg.body = "Hey %s, sending you this email from my Product Verifiction system , use the this temporarly password for this atempt and change later : <%s>" % (user.name ,tempPass )
        mail.send(msg)
        user.password = generate_password_hash(tempPass, method="sha256")
        db.session.commit()
        return "Reset email sent", 200
    except Exception as e:
        print(e.__doc__)
        raise InternalServerError


@app.route("/v1/auth/reset-password/", methods=["POST"])
@token_required
def reset_password(current_user):
    body = request.get_json()
    password = body.get("password")
    confirm_password = body.get("confirm_password")
    if password != confirm_password:
        return "New password and confirm password must match.", 409
    current_user.password = generate_password_hash(password, method="sha256")
    db.session.commit()
    return "Password reset was successful", 200

 
# api to set new vaccine every api call
@app.route("/v1/blockchain/create_contract", methods=["POST"])
@token_required
def transaction(user):
    print(user)
    auth_headers = request.headers.get("Authorization", "").split()
    userEmail = user.email
    result = request.get_json()
    is_fake = False
    product_id = result["product_code"]
    if Product.query.filter_by(id=product_id).first():
        return {"message": "Product already exists"}, 409

    contract_interface = get_Product_Contract_Interface()
    w3.eth.defaultAccount = w3.eth.accounts[1]
    abi = contract_interface["abi"]
    contract_address = deploy_contract(contract_interface)
    contract = w3.eth.contract(address=contract_address, abi=abi)
    tx_hash = contract.functions.setProduct(product_id, is_fake).transact()
    print("this is tx_hash coming : ")
    print(tx_hash)
    tx_receipt = w3.eth.wait_for_transaction_receipt(tx_hash)
    print(tx_receipt)
    product_data = contract.functions.getProduct().call()

    #user = Users.query.filter_by(email=userEmail).first()
    db_product = {
        "id" : product_id,
        "userId": user.id,
        "contract_address": contract_address,
    }

    singleProduct = Product(**db_product)
    db.session.add(singleProduct)
    db.session.commit()
    db.session.commit()

    return (
        jsonify(
            {
                "data": {"product code ": product_data[0], "is_fake": product_data[1]},
                "contract_address": contract_address,
            }
        ),
        200,
    )


@app.route("/v1/blockchain/verify-contract", methods=["POST"])
@cross_origin()
def verify():
    w3.eth.defaultAccount = w3.eth.accounts[1]
    data = request.get_json()
    id_code = data.get("productId")
    print(id_code)
    if id_code is None:
        return "product id is required", 400
    singleProduct = Product.query.filter_by(id=id_code).first()
    print(singleProduct)
    if singleProduct is None:
        return "no product with this id ", 400

    contract_address = singleProduct.contract_address
    contract_interface = get_Product_Contract_Interface()
    abi = contract_interface["abi"]
    try:
        contract_instance = w3.eth.contract(address=contract_address, abi=abi)
    except InvalidAddress:
        return "The Product ID does not exist ", 404
    Product_data = contract_instance.functions.getProduct().call()

    return (
        jsonify(
            {
                "contract_address": contract_address,
                "data": {"product_code": Product_data[0], "is_fake": Product_data[1]},
            }
        ),
        200,
    )
