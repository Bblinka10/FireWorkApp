CREATE TABLE products(
    productid SERIAL PRIMARY KEY,
    productname TEXT NOT NULL,
    producttype TEXT NOT NULL,
    productcost DECIMAL(6, 2) NOT NULL,
    productsaleprice DECIMAL(6, 2) NOT NULL,
    productquantity INT NOT NULL
);

CREATE TABLE sales(
    saleid SERIAL PRIMARY KEY,
    saletotal DECIMAL(7, 2) DEFAULT 0.00,
    saledate TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE saleitems(
    saleitemid SERIAL PRIMARY KEY,
    saleid INT NOT NULL,
    productid INT NOT NULL,
    quantity INT NOT NULL,
    itemtotal DECIMAL(7, 2),
    FOREIGN KEY (saleid) REFERENCES sales(saleid) ON DELETE CASCADE,
    FOREIGN KEY (productid) REFERENCES products(productid) ON DELETE CASCADE
)