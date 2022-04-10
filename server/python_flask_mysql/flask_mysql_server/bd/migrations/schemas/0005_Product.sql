CREATE TABLE IF NOT EXISTS product (
    id_product VARCHAR(64) NOT NULL DEFAULT '',
    name_product VARCHAR(256) DEFAULT '',
    price INTEGER DEFAULT 0,
    isStored BOOLEAN DEFAULT 0,
    PRIMARY KEY (id_product)
) ENGINE = "InnoDB" DEFAULT CHARSET=utf8;