DROP PROCEDURE IF EXISTS CreateOrderByList;

CREATE PROCEDURE CreateOrderByList (
    IN id_order VARCHAR(64),
    IN id_client VARCHAR(64),
    IN name_order VARCHAR(256)
) BEGIN
    INSERT INTO order_by_list (id_order, id_client, name_order)
    VALUES (id_order, id_client, name_order);
END;
