DROP DATABASE IF EXISTS todo_db;
CREATE DATABASE todo_db;
USE todo_db;



CREATE TABLE IF NOT EXISTS posts (
  id INT NOT NULL AUTO_INCREMENT,
  userId INT NOT NULL,
  category VARCHAR(80) NOT NULL,
  title VARCHAR(200) NOT NULL,
  details VARCHAR(500) NOT NULL,
  imageURL VARCHAR(200) NOT NULL,
  imptURL VARCHAR(200),
  PRIMARY KEY (id)
);

select * from users;
select * from posts;
