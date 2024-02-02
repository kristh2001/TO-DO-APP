CREATE DATABASE IF NOT EXISTS toDodb;

USE toDodb;

#DROP TABLE IF EXISTS ToDo;

CREATE TABLE ToDo (
	id INT AUTO_INCREMENT PRIMARY KEY,
    task VARCHAR(50)
);

INSERT INTO ToDo (task)
VALUES ('Taks1'),
       ('Task2'),
       ('Task3'),
       ('Task4'),
       ('Task5');
       
#SELECT * FROM ToDo