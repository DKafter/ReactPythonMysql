DROP PROCEDURE IF EXISTS CreatePurcase;

CREATE PROCEDURE CreatePurcase (
    IN id_purcase VARCHAR(64),
    IN summary INTEGER,
    IN discount INTEGER
) BEGIN
    INSERT INTO purcase (id_purcase, summary, discount)
    VALUES (id_purcase, summary, discount);
END;
