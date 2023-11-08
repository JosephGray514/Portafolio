CREATE DATABASE graysports;

use graysports

CREATE TABLE catalogue(
    id INT (6) NOT NULL AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(50) NOT NULL,
    imgUrl VARCHAR(500) NOT NULL
);


-- creating a table
CREATE TABLE product(
    id INT (6) NOT NULL AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(500) NOT NULL,
    description TEXT,
    information TEXT,
    price INT NOT NULL
);

CREATE TABLE product_catalogue(
    id_product INT (6) NOT NULL,
    id_catalogue INT (6) NOT NULL,
    FOREIGN KEY (id_product) REFERENCES product(id),
    FOREIGN KEY (id_catalogue) REFERENCES catalogue(id) 
);

-- creating a table
CREATE TABLE img(
    id INT (6) NOT NULL AUTO_INCREMENT PRIMARY KEY,
    id_product INT(6) NOT NULL,
    url VARCHAR(500) NOT NULL,
    FOREIGN KEY (id_product) REFERENCES product(id)
);

-- creating a table
CREATE TABLE type(
    id INT (6) NOT NULL AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(50) NOT NULL
);

-- creating a table
CREATE TABLE sizes(
    id INT (6) NOT NULL AUTO_INCREMENT PRIMARY KEY,
    size VARCHAR(50) NOT NULL,
    id_type INT(6) NOT NULL,
    FOREIGN KEY (id_type) REFERENCES type(id)
);

CREATE TABLE product_sizes(
    id_product INT(6) NULL,
    id_sizes INT(6) NULL,
    status INT NULL,
    quantity INT NULL,
    FOREIGN KEY (id_product) REFERENCES product(id),
    FOREIGN KEY (id_sizes) REFERENCES sizes(id)
);

-- to show all tables
SHOW TABLES;

-- to describe product
describe catalogue;

-- to describe product
describe product;

-- to describe img
describe img;

-- to describe type
describe type;

-- to describe sizes
describe sizes;

-- to describe product_sizes
describe product_sizes;

