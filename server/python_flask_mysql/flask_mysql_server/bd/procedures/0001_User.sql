
DROP PROCEDURE IF EXISTS CreateUser;

CREATE PROCEDURE CreateUser (
    IN id_client VARCHAR(64),
    IN Surname VARCHAR(256),
    IN Name VARCHAR(256),
    IN Phone VARCHAR(64),
    IN Home VARCHAR(64),
    IN Email VARCHAR(34),
    IN Password VARCHAR(128),
    IN Salt VARCHAR(128)
) BEGIN
    INSERT INTO client (id_client, Surname, Name, Phone, Home, Email, Password, Salt)
    VALUES (id_client, Surname, Name, Phone, Home, Email, Password, Salt);
END;
