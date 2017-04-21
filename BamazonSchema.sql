
CREATE DATABASE Bamazon_db;



USE Bamazon_db;

CREATE TABLE products (
  item_id integer(100) Auto_Increment NOT NULL,
  product_name varchar(50) NOT NULL,
  department_name varchar(20),
  price decimal(5,2), 
  stock_quanity integer(10),
  PRIMARY KEY (item_id)
);



