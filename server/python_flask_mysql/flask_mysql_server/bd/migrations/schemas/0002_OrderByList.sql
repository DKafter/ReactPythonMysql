CREATE TABLE IF NOT EXISTS order_by_list (
    id_order VARCHAR(64) NOT NULL DEFAULT '',
    id_client VARCHAR(64),
    name_order VARCHAR(256),
    PRIMARY KEY (id_order, id_client),
    FOREIGN KEY (id_client)
    REFERENCES client(id_client)
    ON DELETE CASCADE
    ON UPDATE NO ACTION
) ENGINE = "InnoDB" DEFAULT CHARSET=utf8;