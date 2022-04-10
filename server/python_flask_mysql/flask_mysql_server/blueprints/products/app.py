from asyncio.windows_events import NULL
import json
import re
import uuid
from jinja2 import Undefined
from numpy import where
from sqlalchemy import engine, exc
from flask import Blueprint, jsonify, make_response, request
from bd.execute import Executer
from bd_start import Bd
from modules.crypto_jwt.jwt_crypto import gerenerate_jwt_token, decode_jwt_token
from modules.crypto_password.password import check, sign

products = Blueprint("products", __name__)

@products.route("/user/products", methods=["GET"])
def get_products():
    bd = Bd();
    connect = bd.connectBd();
    ex = Executer(connect);
    result = ex.get_products();
    d = {};
    lst = [];
    for i in result:
        d = dict(i);
        lst.append(d);
    print(d);
    res = make_response(jsonify(lst));
    res.status_code = 200;
    return res;
    
    

@products.route("/user/products/register", methods=["POST"])
def register_products():
    bd = Bd();
    connect = bd.connectBd();
    ex = Executer(connect);
    data = request.json;
    print(f"data {data}");
    try:
    
        id_order = data.get("id_order");
        id_client = data.get("id_client");
        name_of_process = data.get("name_of_process");
        isStored: str = "";
        name_product: str = "";
        price: int = 0;
        _sum: int = 0;
        _list = data.get("list");
        
        ex.create_order_by_list("CreateOrderByList", kwargs={
            "id_client": id_client,
            "id_order": id_order,
            "name_order": f"Заказ под номером клиента {id_client}"
        });
        
     
        if _list is not NULL:
            for p in _list:
                isStored = p.get("isStored");
                name_product = p.get("name_product");
                price = p.get("price");
                id_order_products = p.get("id_product");
                _sum += price;
                
                ex.create_order_products("CreateOrderProducts", kwargs={
                    "id_order_products": id_order_products,
                    "id_order": id_order,
                    "name_product": name_product,
                    "price": price,
                    "isStored": isStored
                });
            
        
        ex.create_process_type("CreateProcessType", kwargs={
            "id_process": id_order,
            "name_process": name_of_process
        });   
         
        ex.create_purcase("CreatePurcase", kwargs={
                "id_purcase": id_order,
                "summary": _sum,
                "discount": 0
        }); # не робит
            
        res = make_response({
            "executed": True
        });
        res.status_code = 201;
    except Exception as e:
        res = make_response({
            "executed": False
        });
        print(e);
        res.status_code = 404;
    # {'id_order': '0ceb95eb2a8c47e795994736b12b20e5', 
    # 'id_client': '758a81a16f2e41aeb815f6777df6836d', 
    # 'name_of_process': 'Очистка', 
    # 'list': [{'id_product': '0', 'isStored': 1, 
    # 'name_product': 'Ожерелье', 'price': 3000, 
    # 'isActive': True}, 
    # {'id_product': '1', 'isStored': 0, 
    # 'name_product': 'Колье', 'price': 1500, 
    # 'isActive': True}, {'id_product': '2', 
    # 'isStored': 1, 'name_product': 
    # 'Брюсье', 'price': 800, 'isActive': True}]}
    
    # 0002_OrderByList  CreateOrderByList
    # 0003_OrderProducts CreateOrderProducts
    # 0004_Purcase CreatePurcase
    # 0005_ProcessType CreateProcessType
    return res;