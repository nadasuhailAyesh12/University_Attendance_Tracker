
BEGIN;


DROP TABLE IF EXISTS users CASCADE;

CREATE TABLE
    users(
        ID Integer  primary key ,
        name varchar(20),
        password text not null,
         role text 
    );

--!fake Data

INSERT INTO
    users(
        ID,
        name,
        password,
        role
    )
VALUES (
        220200628,
        'Nada',
        '123456',
        'Admin'
    ),
    (
        220200620,
        'Noura',
        '123456+',
        'Admin'
    );

COMMIT;