import re
import uuid
from jinja2 import Undefined
from numpy import where
from sqlalchemy import engine, exc
from flask import Blueprint, jsonify, make_response, render_template, request
from bd.execute import Executer
from bd_start import Bd
from modules.crypto_jwt.jwt_crypto import gerenerate_jwt_token, decode_jwt_token
from modules.crypto_password.password import check, sign

user = Blueprint("user", __name__)


@user.route("/user", methods=["GET"])
def get_user():
    bd = Bd()
    connect = bd.connectBd()
    ex = Executer(connect)

    result = ex.get_users()

    d = {}
    lst = []
    for i in result:
        d = dict(i)
        lst.append(d)

    res = make_response(jsonify(lst))
    res.status_code = 201
    return res

@user.route("/user/register/admin", methods=["POST", "GET"])
@user.route("/user/admin", methods=["POST", "GET"])
@user.route("/admin", methods=["POST", "GET"])
def register_admin():
    if request.method == "GET":
        return render_template("admin_register.html", port="4000");
    if request.method == "POST":
        res = make_response({
            "yes": True
        }, 201);
        return res;

@user.route("/user/register", methods=["POST", "PUT"])
def register_user():
    bd = Bd()
    connect = bd.connectBd()
    ex = Executer(connect)
    data = request.json

    if request.method == "POST":
        if not re.match(r"^[A-Za-z0-9\.\+_-]+@[A-Za-z0-9\._-]+\.[a-zA-Z]*$", data.get("email")) or len(data.get("email")) > 33:
            res = make_response(jsonify({
                "Error": "Mail isn't validate"
            }))
            res.status_code = 404
            return res

        result: tuple = ex.get_users_by_id(
            where="Email", userWhere=data.get("email"))

        if result is not None:
            res = make_response(jsonify({
                "Error": "This email is created"
            }))
            res.status_code = 404
            return res

        password = str(data.get("password"))
        data_password = sign(password)
        id_client = uuid.uuid4().hex
        data_salt = data_password.get("salt")
        data_key = data_password.get("key")
        # storage[:32] - salt
        # storage[32:] - password

        ex.create_user(procedureName="CreateUser", kwargs={
            "id_client": id_client,
            "Name": data.get("name", ""),
            "Surname": data.get("surname", ""),
            "Phone": data.get("phone", ""),
            "Home": data.get("home", ""),
            "Email": data.get("email"),
            "Password": data_key,
            "Salt": data_salt
        })

        res = make_response(jsonify({
            **data,
            "isRegisterUser": True
        }))
        res.status_code = 201

    return res


@user.route("/user/login", methods=["POST", "PUT"])
def login_user():
    bd = Bd()
    connect = bd.connectBd()
    ex = Executer(connect)
    data = request.json
    password = str(data.get("password"))
    result = ex.get_users_by_id(
        query="id_client, Email, Password, Salt, Surname, Name, Phone, Home, Current_Day", where="Email", userWhere=data.get("email"))

    data_current_day = result[8];
    data_home = result[7];
    data_phone = result[6];
    data_full_name = result[4] + " " + result[5];
    data_salt = result[3]
    data_key = result[2]
    data_email = result[1]
    data_id = result[0]
    jwt_token: str = data.get("JWT_TOKEN", Undefined)
    login = check(salt=data_salt, password=password, hashPassword=data_key)

    if login == False:
        res = make_response(jsonify({
            "Error": "You can't logged"
        }))

        res.status_code = 404
        return res

    if request.method == "POST":
        jwt_token = gerenerate_jwt_token({
            "id_client": data_id
        })

        res = make_response(jsonify({
            "email": data_email,
            "id": data_id,
            "jwt_token": jwt_token,
            "isLogin": "true",
            "fullname": data_full_name,
            "phone": data_phone,
            "home": data_home,
            "current_day": data_current_day
        }))

        res.status_code = 200
        return res

    if request.method == "PUT":
        jwt_token = decode_jwt_token({
            "encode": jwt_token
        })

        if jwt_token.get("id") == data_id:
            jwt_token = gerenerate_jwt_token({
                "id_client": data_id
            })

            res = make_response(jsonify({
                "email": data_email,
                "id": data_id,
                "jwt_token": jwt_token,
                "isLogin": "true"
            }))

            res.status_code = 200
            return res
        
        
@user.route("/user/change", methods=["PUT"])
def update_information():
    bd = Bd()
    connect = bd.connectBd()
    ex = Executer(connect)
    data = request.json
    print(data);
    #result = ex.get_from_bd_many(selectFrom=f"client WHERE ${id_client} = id_client AND ${email} = email");
    '''
    {'current_day': 'Wed, 06 Apr 2022 19:32:00 GMT', 'email': 'a@mail.ru', 'fullname': 'alex Alex', 'home': 'A.A.A.Push', 
     'id': 'e0ed8237b1aa4caba7af1d454b335dd6', 
     'isLogin': 'true', 'jwt_token': 
    'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpZCI6ImUwZWQ4MjM3YjFhYTRjYWJhN2FmMWQ0NTRiMzM1ZGQ2IiwiaWF0IjoxNjQ5OTM0NzE1fQ
    .LK1-Mz75uEcn0gErEUcxh-uuek_92qWCMbAwS95ejm0', 'phone': '+7 (850) 350-21-32'}
    '''
    
    #     id_client VARCHAR(64) NOT NULL DEFAULT '',
    # Surname VARCHAR(256) DEFAULT '',
    # Name VARCHAR(256) DEFAULT '',
    # Phone VARCHAR(64),
    # Home VARCHAR(64),
    # Current_Day TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    # Email VARCHAR(34) UNIQUE,
    # Password VARCHAR(128),
    # Salt VARCHAR(128),
    # PRIMARY KEY (id_client)
    
    try:
        id_client = data.get("id");
        surname = data.get("surname");
        name = data.get("name");
        home = data.get("home");
        old_email = data.get("prevEmail");
        new_email = data.get("email");
        phone = data.get("phone");

        ex.update_table("client", f''' 
                        Surname = '{surname}',\n
                        Name = '{name}',\n
                        Home = '{home}',\n
                        Email = '{new_email}',\n
                        Phone = '{phone}'                 
                        ''', f"Email = '{old_email}' AND id_client = '{id_client}'");
        
        res = make_response(jsonify({
            "executed": True
        }));
        
        res.status_code = 201;
        return res;
    except Exception as e:
        res = make_response(jsonify({
            "executed": False
        }));

        res.status_code = 500;