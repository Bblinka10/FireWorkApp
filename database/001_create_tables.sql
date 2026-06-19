CREATE TABLE products(
    productid SERIAL PRIMARY KEY,
    productname TEXT NOT NULL,
    producttype TEXT NOT NULL,
    productcost DECIMAL(6, 2) NOT NULL,
    productsaleprice DECIMAL(6, 2) NOT NULL,
    productquantity INT NOT NULL
)

CREATE TABLE invtransactions(
    transactionid SERIAL PRIMARY KEY,
    productid INT NOT NULL,
    quantitychange INT NOT NULL,
    transactiondate TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (productid) REFERENCES products(productid)
)