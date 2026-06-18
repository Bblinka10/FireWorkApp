CREATE TABLE products(
    productid SERIAL PRIMARY KEY,
    productname TEXT NOT NULL,
    producttype TEXT NOT NULL,
    productcost DECIMAL(6, 2) NOT NULL,
    productsaleprice DECIMAL(6, 2) NOT NULL,
    productquantity INT NOT NULL
)