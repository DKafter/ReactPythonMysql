DROP PROCEDURE IF EXISTS CreateProduct;

CREATE PROCEDURE CreateProduct (
    IN id_product VARCHAR(64),
    IN name_product VARCHAR(256),
    IN price VARCHAR(256),
    IN isStored BOOLEAN
) BEGIN
    INSERT INTO product (id_product, name_product, price, isStored)
    VALUES (id_product, name_product, price, isStored);
END;
