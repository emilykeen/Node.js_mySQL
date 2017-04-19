USE Bamazon_db;

CREATE TABLE departments (
  department_id integer(100) Auto_Increment NOT NULL,
  department_name varchar(50),
  over_head_costs decimal(10,2), 
  total_sales integer(10),
  PRIMARY KEY (department_id)
);