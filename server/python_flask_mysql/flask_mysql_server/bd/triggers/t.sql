-- DROP TRIGGER IF EXISTS OnEquateOrder;
-- CREATE TRIGGER OnEquateOrder
--     BEFORE UPDATE ON client
--     FOR EACH ROW
--     INSERT INTO order_by_list
--     SET ACTION = 'update',
--         order_by_list.id_client = id_client;




-- вызов ошибки 1054
-- нельзя обновлять. Таккже sqlalchemy приписывает в комментарий