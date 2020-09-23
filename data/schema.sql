DROP TABLE IF EXISTS books;

CREATE TABLE books (
  ID SERIAL PRIMARY KEY,
  author VARCHAR(100),
  title VARCHAR(255),
  isbn VARCHAR(100),
  image_url VARCHAR(255),
  description TEXT
);

