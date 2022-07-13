import json
from datetime import datetime
import datetime as date
from functools import wraps
import jwt
from flask import Flask, jsonify, request, current_app, render_template
from flask_cors import cross_origin
from flask_mail import Message
from flask_sqlalchemy import SQLAlchemy
from web3.exceptions import InvalidAddress
from werkzeug.exceptions import InternalServerError
from werkzeug.security import generate_password_hash, check_password_hash
import os

from compile_sol import get_contract_interface, deploy_contract
from compile_solidity_utils import w3
from flask import Flask, Response, request, jsonify
from marshmallow import Schema, fields, ValidationError

file_path = os.path.abspath(os.getcwd())+"\database.db"

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///'+file_path
app.secret_key = 'hze6EPcv0fN_81Bj-nA3d6f45a5fc12445dbac2f59c3b6c7c309f02079d'
db = SQLAlchemy(app)
DOMAIN = 'http://localhost:3000/'
reset_password_url = DOMAIN + 'reset-password?token='

@app.before_first_request
def create_tables():
    db.create_all()

class Users(db.Model):
    __tablename__ = 'Users'

    id = db.Column(db.Integer, primary_key=True, index=True)

    id_code = db.Column(db.String(25), unique=True)

    name = db.Column(db.String(50), unique=False)


    email = db.Column(db.String(50), unique=True)

    password = db.Column(db.String(256), unique=False)

    user_role = db.Column(db.String(16))

    @classmethod
    def authenticate(cls, **kwargs):
        email = kwargs.get('email')
        password = kwargs.get('password')

        if not email or not password:
            return None

        user = cls.query.filter_by(email=email).first()
        if not user or not check_password_hash(user.password, password):
            return None

        return user

    def __init__(self, email, password, name, id_code):
        self.email = email
        self.password = generate_password_hash(password, method='sha256')
        self.name = name
        self.id_code = id_code

    def to_dict(self):
        return dict(id_code=self.id_code, email=self.email, name=self.name)


def token_required(f):
    @wraps(f)
    def _verify(*args, **kwargs):
        print(request.get_json())
        auth_headers = request.headers.get('Authorization', '').split()
        print(auth_headers)

        invalid_msg = {
            'message': 'Invalid token. Registeration and / or authentication required',
            'authenticated': False
        }
        expired_msg = {
            'message': 'Expired token. Reauthentication required.',
            'authenticated': False
        }

        if len(auth_headers) != 2:
            return jsonify(invalid_msg), 401

        try:
            token = auth_headers[1]
            print(token)
            data = jwt.decode(token, current_app.config['SECRET_KEY'], algorithms=["HS256"])
            user = Users.query.filter_by(email=data['sub']).first()
            if not user:
                raise RuntimeError('User not found')
            return f(user, *args, **kwargs)
        except jwt.ExpiredSignatureError:
            return jsonify(expired_msg), 401  # 401 is Unauthorized HTTP status code
        except (jwt.InvalidTokenError, Exception) as e:
            print(e)
            return jsonify(invalid_msg), 401

    return _verify


@app.route('/auth/login/', methods=('POST',))
@cross_origin()
def login():
    data = request.get_json()
    user = Users.authenticate(**data)
    if not user:
        return jsonify({'message': 'Invalid credentials', 'authenticated': False}), 401
    print(user.email)
    token = jwt.encode({
        'sub': user.email,
        'iat': datetime.utcnow(),
        'exp': datetime.utcnow() + date.timedelta(minutes=30)},
        current_app.config['SECRET_KEY'])
    response = jsonify(
        {'token': token, "name": user.name, "email": user.email,"id_code":user.id_code,
         "api_key": user.key})

    return response


@app.route('/auth/register/', methods=('POST',))
@cross_origin()
def register():
    data = request.get_json()
    user_data = {"id_code": data.get('id_code', ''),
                 "name": data.get('name', ''),
                 "email": data.get('email'),
                 "password": data.get('password')}
    if None in user_data.values():
        return {"message": "Missing/extra parameters"}, 400
    if not Users.query.filter_by(email=data.get('email')).first():
        user = Users(**user_data)
        db.session.add(user)
        db.session.commit()
        token = jwt.encode({
            'sub': user.email,
            'iat': datetime.utcnow(),
            'exp': datetime.utcnow() + date.timedelta(minutes=30)},
            current_app.config['SECRET_KEY'])
        result = user.to_dict()
        result['token'] = token
        return jsonify(result), 201
    else:
        return {"message": "User already exists"}, 409


@app.route('/auth/forgot-password/', methods=('POST',))
@cross_origin()
def forgot_password():
    try:
        body = request.get_json()
        email = body.get('email')
        if not email:
            return 'Unprocessable entity', 422

        user = Users.query.filter_by(email=email).first()
        if not user:
            return 'User Does Not exist ', 422
        reset_token = jwt.encode({
            'sub': user.email,
            'iat': datetime.utcnow(),
            'exp': datetime.utcnow() + date.timedelta(hours=24)},
            current_app.config['SECRET_KEY'])
        url = reset_password_url + reset_token
        msg = Message('Forgot your password?', recipients=[user.email])
        msg.body = render_template('reset_password.txt', url=url, name=user.first_name)
        msg.html = render_template('reset_password.html', url=url)
        mail.send(msg)
        return 'Reset email sent', 200
    except Exception as e:
        print(e.__doc__)
        raise InternalServerError


@app.route('/auth/reset-password/', methods=['POST'])
@cross_origin()
@token_required
def reset_password(current_user):
    body = request.get_json()
    password = body.get('password')
    confirm_password = body.get('confirm_password')
    if password != confirm_password:
        return 'New password and confirm password must match.', 409
    current_user.password = generate_password_hash(password, method='sha256')
    db.session.commit()
    return 'Password reset was successful', 200


class VaccineSchema(Schema):
    id_card = fields.String(required=True)
    is_vaccinated = fields.String(required=True)



# api to set new user every api call
@app.route("/blockchain/create_contract", methods=['POST'])
def transaction():
    contract_interface=get_contract_interface()
    w3.eth.defaultAccount = w3.eth.accounts[1]
    abi = contract_interface["abi"]
    contract_address = deploy_contract(contract_interface)
    contract = w3.eth.contract(
    address=contract_address,abi=abi)
    result = request.get_json()
    is_vaccinated=result['is_vaccinated']
    tx_hash = contract.functions.setVaccine(
        result['id_code'], is_vaccinated
    ).transact()
    print(tx_hash)
    tx_receipt = w3.eth.wait_for_transaction_receipt(tx_hash)
    print(tx_receipt)
    user_data = contract.functions.getVaccine().call()
    return jsonify({"data": user_data,"contract_address":contract_address}), 200

@app.route("/blockchain/verify-contract", methods=['POST'])
def verify():
    w3.eth.defaultAccount = w3.eth.accounts[1]
    data=request.get_json()
    contract_address=data.get("contract_address","")
    contract_interface = get_contract_interface()
    abi = contract_interface["abi"]
    try :
        contract_instance = w3.eth.contract(address=contract_address, abi=abi)
    except  InvalidAddress:
        return 'The Vaccine ID does not exist ',404
    vaccine_data=contract_instance.functions.getUser().call()

    return jsonify({"data": {"id_code":vaccine_data[0],"is_vaccinated":vaccine_data[1]}}), 200
