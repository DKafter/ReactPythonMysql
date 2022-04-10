from ast import arg
from asyncio.windows_events import NULL
from posixpath import dirname
from xmlrpc.client import Boolean
from sqlalchemy import create_engine;
from sqlalchemy.sql import text;
from sqlalchemy import engine;

import os;
import sys
from modules.direction import Direction;

dir_name = [
    r"migrations/upgrade",
    r"migrations/schemas",
    r"triggers",
    r"procedures"
];      


def create_connect(root='root', 
                   host='localhost', 
                   password='root',  
                   port = 3306) -> engine.Engine:
    engine = create_engine(
        f'mysql://{root}:{password}@{host}:{port}', echo=True, future=True, isolation_level='AUTOCOMMIT');
    return engine;

def join_connect(root='root', 
                   host='localhost', 
                   password='root',  
                   port = 3306,
                   db = 'root') -> engine.Engine:
    engine = create_engine(
        f'mysql://{root}:{password}@{host}:{port}/{db}', echo=True, future=True, isolation_level='AUTOCOMMIT');
    return engine;

def connect(root='root', host='localhost', password='root', path = "" , port = 3306) -> engine.Engine:
    argv = sys.argv[1] if len(sys.argv) >= 2 else NULL;
    if argv != NULL:
        dir_name.insert(0, r"migrations/downgrade");
        
    engine = create_connect(
        root=root,
        host=host,
        password=password,
        port=port
    );
    
    with engine.connect() as con:
        # names = [];
        # files = [];
        # for list in dir_name:
        #     names.append(os.path.join(os.getcwd(), path, list));
            
        # for name in names:
        #     for file in os.listdir(name):
        #         files.append(os.path.join(name, file));
                
        # for fullname in files:
        #     get_filename = os.path.isfile(fullname);
        #     if isDownGrade == False:
        #         continue;
            
        #     if get_filename:
        #         print("Yes");
                # with open(fullname) as file:
            with con.begin():
                direction = Direction(dir_name, "bd");
                direction.direction();
                str_concate = direction.getConcate();
                query = text(str_concate + "\n");
                con.execute(query);
                query = "";
    return engine;

    # // db - 1
    # // user - 2
    # // product - 3
    # // order - 4
    # // purcase - 5
    # // process - 6