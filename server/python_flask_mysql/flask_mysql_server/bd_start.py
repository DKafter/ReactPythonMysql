from asyncio.windows_events import NULL
from importlib.resources import path
from lib2to3.pytree import Base
from xmlrpc.client import boolean

from numpy import void

from bd.db import connect, create_connect, join_connect;
from dotenv import load_dotenv;
from os.path import join, abspath;
import os;

class Bd(object):
    __host: str;
    __root: str;
    __password: str;
    __db: str;
    __db_port: str;
    __pathEnv: str;
    __pathBd: str;
    __envData: dict;
    
    def __init__(self, pathEnv: str = ".env", pathBd: str = "bd"):
        self.__pathEnv = pathEnv;
        self.__pathBd = pathBd;
        
    def __data_env__(self) -> boolean:
        try:
            env_file = join(abspath(os.getcwd()), self.__pathEnv);
            load_dotenv(env_file);
            config = os.environ;
            #print(config.get("HOST"), config.get("PASSWORD"), config.get("ROOT"));
            self.__envData = config;
            self.__host = str(config.get("HOST"));
            self.__password = str(config.get("PASSWORD"));
            self.__root = str(config.get("ROOT"));
            self.__db = str(config.get("DATABASE", NULL));
            self.__db_port = str(config.get("PORT_BD"));
            return True;
        except BaseException as e:
            return e;

    def get_env(self) -> dict:
        self.__data_env__();
        return {
            "paths": {
                "pathEnv": self.__pathEnv,
                "pathBd": self.__pathBd
            },
            
            "host": self.__envData.get("HOST", "NULL"),
            "password": self.__envData.get("PASSWORD", "NULL"),
            "root": self.__envData.get("ROOT", "NULL"),
            "port_web": self.__envData.get("PORT_WEB", "NULL"),
            "port_bd": self.__envData.get("PORT_BD", "NULL"),
        };
    
    def connectBd(self):
        self.__data_env__();
        if self.__db is not NULL:
            return join_connect(
                root = self.__root, 
                host = self.__host, 
                password = self.__password,
                db = self.__db
            );
        
    def main_bd_with_data(self): 
        isDataSaved = self.__data_env__();
        return connect(
                root = self.__root, 
                host = self.__host, 
                password = self.__password,
                port = self.__db_port, 
                path = self.__pathBd) if isDataSaved else f"Exception {isDataSaved}";
        
    def main_bd_without_data(self):
        isDataSaved = self.__data_env__();
        return connect(
                path = self.__pathBd) if isDataSaved else f"Exception {isDataSaved}";
        