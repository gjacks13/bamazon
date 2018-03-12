CREATE SCHEMA `bamazon` ;

USE bamazon;

CREATE TABLE products (
    item_id int NOT NULL AUTO_INCREMENT,
    product_name varchar(255) NOT NULL,
    department varchar(255) NOT NULL,
	price DECIMAL(10,2) NOT NULL,
    stock_quantity int NOT NULL,
    PRIMARY KEY (item_id)
);

INSERT INTO products
    (product_name, department, price, stock_quantity)
VALUES
    ("Golden Owl Blue Crystal Stud Earrings", "Jewelry", 10.86, 13),
    ("Nike Men's Air Max 90 Essential Running Shoe", "Clothing", 78.99, 106),
    ("Nike Air Max 2016", "Clothing", 99.95, 508),
    ("MLS Youth Boys Structured Flex Hat", "Clothing", 3.59, 1200),
    ("Wilson NCAA Forte Fybrid II Game Ball", "Sports", 59.99, 1587),
    ("Wilson NCAA Tournament Game Basketball", "Sports", 47.37, 9898),
    ("Repose Yano Planter", "Home & Decor", 52.62, 564),
    ("Brain Specimen Coasters", "Home & Decor", 25.00, 9854),
    ("Nomad Portable USB Turntable ", "Home Audio", 132.99, 873),
    ("AmazonBasics Portable Wireless Bluetooth Speaker", "Home Audio", 16.28, 8798)