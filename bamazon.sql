--if database exists delete it
DROP DATABASE IF EXISTS bamazon_db;
--create database called bamazon_db
CREATE DATABASE bamazon_db;

USE bamazon_db;

--create table inside database called products
CREATE TABLE products(
	item_id INTEGER(11) AUTO_INCREMENT NOT NULL,
	product_name VARCHAR(50) NOT NULL,
	department_name VARCHAR(50) NOT NULL,
	price FLOAT(11) NOT NULL,
	stock_quantity INTEGER(11) NOT NULL,

	PRIMARY KEY(item_id)
);

-- Populate this database with around 10 different products. 
-- (i.e. Insert "mock" data rows into this database and table).
INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES("Nike Shoes", "Men's Apparel", 40.00, 5);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES("iBook", "Electronics", 1500, 6);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES("Samsung Note", "Electronics", 700, 6);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES("Altra Shoes", "Women's Apparel", 120, 20);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES("Puma Hoodie", "Men's Apparel", 30, 12);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES("Crocs", "Men's Apparel", 15.00, 7);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES("Lenovo Laptop", "Electronics", 1500, 6);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES("computer mouse", "Electronics", 10.00, 12);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES("Bluetooth headphones", "Electronics", 90.00, 23);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES("Bluetooth car stereo", "Auto Accessories", 1500, 6);	
-- Pull all data in this table
SELECT * FROM products;