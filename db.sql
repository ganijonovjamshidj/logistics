CREATE DATABASE water_delivery;

\c water_delivery;

CREATE TABLE districts (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100) NOT NULL
);

CREATE TABLE customers (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  phone VARCHAR(20) UNIQUE NOT NULL
);

CREATE TABLE address (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100),
  customer_id INT REFERENCES customers(id),
  address VARCHAR(255),
  location VARCHAR(255),
  district_id INT REFERENCES districts(id)
);

CREATE TABLE water_products (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  volume_liters DECIMAL(5,2),
  price INT NOT NULL
);

CREATE TABLE delivery_staff (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  phone VARCHAR(20) UNIQUE,
  vehicle_number VARCHAR(50),
  district_id INT REFERENCES districts(id)
);

CREATE TABLE orders (
  id SERIAL PRIMARY KEY,
  customer_id INT REFERENCES customers(id),
  delivery_staff_id INT REFERENCES delivery_staff(id),
  order_date DATE DEFAULT CURRENT_DATE,
  status VARCHAR(50)
);

CREATE TABLE order_items (
  id SERIAL PRIMARY KEY,
  order_id INT REFERENCES orders(id),
  product_id INT REFERENCES water_products(id),
  quantity INT NOT NULL,
  total_price DECIMAL(10,2)
);

CREATE TABLE payments (
  id SERIAL PRIMARY KEY,
  order_id INT REFERENCES orders(id),
  amount DECIMAL(10,2),
  payment_date DATE DEFAULT CURRENT_DATE,
  method VARCHAR(50)
);