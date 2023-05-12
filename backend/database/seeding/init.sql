
BEGIN;

DROP TABLE IF EXISTS users, posts, votes,comments CASCADE;

CREATE TABLE
    users (
        id serial primary key,
        username varchar(100) not null unique,
        email text not null unique,
        password text not null,
        img_url text
    );

CREATE TABLE
    posts (
        id serial primary key,
        title text not null,
        content text not null,
        media text,
        user_id INTEGER not null,
        posted_at timestamptz not null default current_timestamp,
        foreign key (user_id) references users(id) on DELETE CASCADE
    );

CREATE TABLE
    comments(
        id SERIAL PRIMARY KEY,
        user_id INTEGER NOT NULL,
        post_id INTEGER NOT NULL,
        comment TEXT NOT NULL,
        posted_at timestamptz not null default current_timestamp,
        FOREIGN KEY(user_id) REFERENCES users(id) ON DELETE CASCADE,
        FOREIGN KEY(post_id) REFERENCES posts(id) ON DELETE CASCADE
    );

CREATE TABLE
    votes(
        id TEXT PRIMARY KEY NOT NULL,
        post_id INTEGER NOT NULL,
        user_id INTEGER NOT NULL,
        vote int not null check (vote in (-1, 1)),
        FOREIGN KEY(post_id) REFERENCES posts(id) ON DELETE CASCADE,
        FOREIGN KEY(user_id) REFERENCES users(id) ON DELETE CASCADE
    );

--!fake Data

INSERT INTO
    users(
        username,
        email,
        password,
        img_url
    )
VALUES (
        'mohammed_agha',
        'mm@gmail.com',
        '123456',
        'https://avatars.githubusercontent.com/u/87938745?v=4'
    );

INSERT INTO
    users(
        username,
        email,
        password,
        img_url
    )
VALUES (
        'ahmed',
        'aa@gmail.com',
        '123456',
        'https://avatars.githubusercontent.com/u/87938745?v=4'
    );

INSERT INTO
    users(
        username,
        email,
        password,
        img_url
    )
VALUES (
        'khalideAgh',
        'kk@gmail.com',
        '123456',
        'https://avatars.githubusercontent.com/u/87938745?v=4'
    );

INSERT INTO
    posts(title, content, user_id)
VALUES ('new Update', 'Now you can upload images in posts', 1);

COMMIT;