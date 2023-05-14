
BEGIN;

DROP TABLE IF EXISTS authuser,users CASCADE;

CREATE TABLE
    authuser(
        ID Integer  primary key ,
        name varchar(20),
        password text not null,
         role text 
    );


COMMIT;