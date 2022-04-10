DROP PROCEDURE IF EXISTS CreateProcessType;

CREATE PROCEDURE CreateProcessType (
    IN id_process VARCHAR(64),
    IN name_process VARCHAR(256)
) BEGIN
    INSERT INTO process_type (id_process, name_process)
    VALUES (id_process, name_process);
END;
