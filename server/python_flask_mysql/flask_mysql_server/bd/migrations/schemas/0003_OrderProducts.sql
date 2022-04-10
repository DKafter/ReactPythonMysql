CREATE TABLE IF NOT EXISTS order_products (
    id_order_products VARCHAR(64) NOT NULL DEFAULT '',
    id_order VARCHAR(64) NOT NULL DEFAULT '',
    name_product VARCHAR(256) DEFAULT '',
    price INTEGER DEFAULT 0,
    isStored BOOLEAN DEFAULT 0,
    PRIMARY KEY (id_order, id_order_products),
    FOREIGN KEY (id_order)
    REFERENCES order_by_list(id_order)
) ENGINE = "InnoDB" DEFAULT CHARSET=utf8;