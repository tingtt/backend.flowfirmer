CREATE DATABASE IF NOT EXISTS test;
use test;

CREATE TABLE user (
    user_id INT(11) AUTO_INCREMENT NOT NULL PRIMARY KEY,
    user_name VARCHAR(200) NOT NULL,
    password varchar(270) NOT NULL,
    mail varchar(30) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
