from ast import Dict
from asyncio.windows_events import NULL
from datetime import datetime, timedelta, timezone
import time
import datetime;
import jwt;

algorithm = "HS256";
jwt_secret_key = "JWT_SECRET_KEY";

def gerenerate_jwt_token(data: dict):
    id_client = data.get("id_client");
    print(f"id client {id_client}");
    if id_client is not NULL:
        time = datetime.datetime.now(tz=timezone.utc) + datetime.timedelta(weeks=1);
        encoded_content = jwt.encode({"id": id_client, "iat": time}, jwt_secret_key, algorithm=algorithm);
        token = str(encoded_content);
        return token

def decode_jwt_token(data: dict):
    encode = data.get("encode");  
    return jwt.decode(encode, jwt_secret_key, algorithms=[algorithm]);