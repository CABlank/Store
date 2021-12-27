CREATE DATABASE database_users;

USE database_users;

CREATE TABLE users(
    id INT(11) NOT NULL AUTO_INCREMENT,
    username VARCHAR(16) NOT NULL,
    password VARCHAR(99) NOT NULL,
    email VARCHAR(99) NOT NULL,
    fullname VARCHAR(99) NOT NULL,
    PRIMARY KEY (id)
);

ALTER TABLE users
ADD CONSTRAINT user_username_unique UNIQUE (username);

DESCRIBE users;


CREATE TABLE products(
    id INT(11) NOT NULL AUTO_INCREMENT,
    name VARCHAR(16) NOT NULL,
    price INT(11) NOT NULL,
    description VARCHAR(99) NOT NULL,
    PRIMARY KEY (id),
    user_id INT(11),
    created_at timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_user FOREIGN KEY (user_id) REFERENCES users(id)
);

ALTER TABLE products
    MODIFY id INT(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT = 2;


