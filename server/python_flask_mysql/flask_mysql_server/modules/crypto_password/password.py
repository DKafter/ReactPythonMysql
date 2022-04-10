import bcrypt;
import os;

def sign(password: str):
    salt = bcrypt.gensalt();
    password = password;
    key = bcrypt.hashpw(password.encode('utf-8'), salt)
    
    return {
        "key": key,
        "salt": salt
    }


def check(password, salt, hashPassword):
    salt = salt;
    password = password;
    print(password, salt);
    new_key = bcrypt.hashpw(password.encode('utf-8'), salt)
    
    if new_key == hashPassword:
        return True;
    return False;