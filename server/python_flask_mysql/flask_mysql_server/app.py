from flask import Flask
from flask_cors import CORS
from numpy import product;
from bd_start import Bd;
from blueprints.user.app import user
from blueprints.products.app import products;
def main():
    bd = Bd();  
    bd.main_bd_with_data();
    env_data = bd.get_env();
    cors = CORS();
    
    flask = Flask(__name__, template_folder="templates/");
    cors.init_app(flask, resources={
            r"/*": {
                "allow_headers": ["Authorization", "Content-Type"]
            }
        });
    
    flask.config['JSON_AS_ASCII'] = False
    flask.register_blueprint(user);
    flask.register_blueprint(products);
    flask.run(
        host=env_data["host"],
        port=env_data["port_web"]
    );
    
if __name__ == "__main__":
    main();