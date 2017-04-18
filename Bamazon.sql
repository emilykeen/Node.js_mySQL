
CREATE DATABASE Bamazon_db;

/*Create a MySQL Database called Bamazon.
Then create a Table inside of that database called products.
The products table should have each of the following columns:
item_id (unique id for each product)
product_name (Name of product)
department_name
price (cost to customer)
stock_quantity (how much of the product is available in stores)
Populate this database with around 10 different products. (i.e. Insert "mock" data rows into this database and table).*/


USE Bamazon_db;

CREATE TABLE products (
  item_id integer(100) Auto_Increment NOT NULL,
  product_name varchar(50) NOT NULL,
  department_name varchar(20),
  price decimal(5,2), 
  stock_quanity integer(10),
  PRIMARY KEY (item_id)
);



