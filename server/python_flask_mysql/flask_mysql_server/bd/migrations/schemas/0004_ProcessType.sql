CREATE TABLE IF NOT EXISTS process_type (
    id_process VARCHAR(64) NOT NULL DEFAULT '',
    name_process VARCHAR(256) DEFAULT '',
    PRIMARY KEY (id_process),
    FOREIGN KEY (id_process)
    REFERENCES order_by_list(id_order)
) ENGINE = "InnoDB" DEFAULT CHARSET=utf8;