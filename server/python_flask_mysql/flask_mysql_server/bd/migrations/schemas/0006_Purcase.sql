CREATE TABLE IF NOT EXISTS purcase (
    id_purcase VARCHAR(64) NOT NULL DEFAULT '',
    summary INTEGER DEFAULT NULL,
    discount INTEGER DEFAULT 0,
    PRIMARY KEY (id_purcase),
    FOREIGN KEY (id_purcase)
    REFERENCES order_by_list(id_order)
) ENGINE = "InnoDB" DEFAULT CHARSET=utf8;