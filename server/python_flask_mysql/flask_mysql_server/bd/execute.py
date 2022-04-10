from asyncio.windows_events import NULL
from sqlite3 import DatabaseError
from flask import jsonify
from numpy import void
from sqlalchemy import create_engine
from sqlalchemy.sql import text
from sqlalchemy import engine, exc
from bd.db import connect
from bd_start import Bd

from modules.direction import Direction

dir_name_executer = [
    r"requests"
]

dir_name_create_user = [
    r"requests/insert"
]

dir_name_get_users = [
    r"migrations/schemas"
]


class Executer(object):
    __connect: engine.Engine

    def __init__(self, connect: engine.Engine):
        self.__connect = connect

    def execute(self):
        try:
            direction = Direction(dir_name_executer, "bd")
            direction.direction()
            query = direction.getConcate()

            with self.__connect.begin() as con:
                result = con.execute(text(query))
                return result.fetchall()

        except exc.DatabaseError as e:
            return ["Connect isn't compilited", e]

    def execute_from_files(self, dir_names: list, s: list):
        try:
            direction = Direction(dir_names, "bd")
            direction.direction_from_file_str(s)
            query = direction.getConcate()

            with self.__connect.begin() as con:
                result = con.execute(text(query))
                return result.fetchall()

        except exc.DatabaseError as e:
            return ["Connect isn't compilited", e]

    def create_user(self, procedureName: str, **kwargs):
        try:
            k = kwargs["kwargs"]
            id_client = k.get("id_client")
            surname = k.get("Surname")
            name = k.get("Name")
            phone = k.get("Phone")
            home = k.get("Home")
            email = k.get("Email")
            password = k.get("Password")
            salt = k.get("Salt")

            with self.__connect.begin() as con:
                con.execute(text(f'''
                    CALL {procedureName}('{id_client}', '{surname}', '{name}', '{phone}', '{home}', '{email}', '{password}', '{salt}')
                '''))
        except exc.DatabaseError as e:
            return ["Connect isn't compilited", e]

    def create_order_by_list(self, procedureName: str, **kwargs):
        try:
            k = kwargs["kwargs"]
            id_client = k.get("id_client")
            id_order = k.get("id_order")
            name_order = k.get("name_order")

            with self.__connect.begin() as con:
                con.execute(text(f'''
                    CALL {procedureName}('{id_order}', '{id_client}', '{name_order}')
                '''))
        except exc.DatabaseError as e:
            return ["Connect isn't compilited", e]

    def create_product(self, procedureName: str, **kwargs):
        try:
            k = kwargs["kwargs"]
            id_product = k.get("id_product")
            name_product = k.get("name_product")
            price = k.get("price")
            isStored = k.get("isStored")

            with self.__connect.begin() as con:
                con.execute(text(f'''                        
                    CALL {procedureName}('{id_product}', '{name_product}', '{price}', {isStored})
                '''))
        except exc.DatabaseError as e:
            return ["Connect isn't compilited", e]

    def create_order_products(self, procedureName: str, **kwargs):
        try:
            k = kwargs["kwargs"]
            id_order_products = k.get("id_order_products")
            id_order = k.get("id_order")
            name_product = k.get("name_product")
            price = k.get("price")
            isStored = k.get("isStored")

            with self.__connect.begin() as con:
                con.execute(text(f'''                        
                    CALL {procedureName}('{id_order_products}', '{id_order}', '{name_product}', '{price}', {isStored})
                '''))
        except exc.DatabaseError as e:
            return ["Connect isn't compilited", e]

    def create_purcase(self, procedureName: str, **kwargs):
        try:
            k = kwargs["kwargs"]
            id_purcase = k.get("id_purcase")
            summary = k.get("summary")
            discount = k.get("discount")

            with self.__connect.begin() as con:
                con.execute(text(f'''                        
                    CALL {procedureName}('{id_purcase}', {int(summary)}, {int(discount)})
                '''))
        except exc.DatabaseError as e:
            return ["Connect isn't compilited", e]

    def create_process_type(self, procedureName: str, **kwargs):
        try:
            k = kwargs["kwargs"]
            id_process = k.get("id_process")
            name_process = k.get("name_process")

            with self.__connect.begin() as con:
                con.execute(text(f'''                        
                    CALL {procedureName}('{id_process}', '{name_process}')
                '''))
        except exc.DatabaseError as e:
            return ["Connect isn't compilited", e]

    def get_users_by_id(self, query="*", where: str = NULL, userWhere: str = NULL):
        return self.get_from_bd_one(selectFrom="client", query=query, where=where, userWhere=userWhere)

    def get_users(self, query="*"):
        return self.get_from_bd_many(selectFrom="client", query=query)

    def get_products(self, query="*"):
        return self.get_from_bd_many(selectFrom="product", query=query)

    def get_from_bd_one(self, selectFrom=NULL, query="*", where: str = NULL, userWhere: str = NULL):
        if(selectFrom is not NULL and where is not NULL and userWhere is not NULL):
            with self.__connect.begin() as con:
                result = con.execute(text(f'''
                                    SELECT {query} FROM {selectFrom} WHERE {where} = '{userWhere}';
                                '''))
                return result.fetchone()

    def get_from_bd_many(self, selectFrom=NULL, query="*"):
        if(selectFrom is not NULL):
            with self.__connect.begin() as con:
                result = con.execute(text(f'''
                                    SELECT {query} FROM {selectFrom};
                                '''))
                return result.fetchall()

    def update_table(self, tableName=NULL, setQueryColumn=NULL, condition=NULL):
        if tableName is not NULL and setQueryColumn is not NULL:
            str = f"UPDATE {tableName} SET {setQueryColumn}"
            if condition is not NULL:
                str = str + " " + f"WHERE {condition}"
            str = str + ";"
            with self.__connect.begin() as con:
                con.execute(text(str))
