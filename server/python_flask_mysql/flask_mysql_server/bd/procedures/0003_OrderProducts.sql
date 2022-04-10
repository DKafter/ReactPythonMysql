DROP PROCEDURE IF EXISTS CreateOrderProducts;

CREATE PROCEDURE CreateOrderProducts (
    IN id_order_products VARCHAR(64),
    IN id_order VARCHAR(64),
    IN name_product VARCHAR(256),
    IN price VARCHAR(256),
    IN isStored BOOLEAN
) BEGIN
    INSERT INTO order_products (id_order_products, id_order, name_product, price, isStored)
    VALUES (id_order_products, id_order, name_product, price, isStored);
END;