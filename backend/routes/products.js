const express = require("express");
const router = express.Router();
const pool = require("../db/connection");

//
// GET all products
//
router.get("/", async (req, res) => {
    try {
        const result = await pool.query("SELECT * FROM products ORDER BY productid");
        res.json(result.rows);
    } catch (err) {
        console.error(err);
        res.status(500).json({error: "Database error"});
    }
});

//
// GET one product by ID
//

router.get("/:productid", async (req, res) => {
    try {
        const { productid } = req.params;

        const result = await pool.query(
            "SELECT * FROM products WHERE productid = $1",
            [productid]
        );

        if (result.rows.length === 0) {
            return res.status(404).json({ error: "Product not found" });
        }

        res.json(result.rows[0]);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Database error" });
    }
});

//
// POST a new product
//
router.post("/", async (req, res) => {
    try {
        const { productname, producttype, productcost, productsaleprice, productquantity } = req.body;

        const result = await pool.query(
            "INSERT INTO products (productname, producttype, productcost, productsaleprice, productquantity) VALUES ($1, $2, $3, $4, $5) RETURNING *",
            [productname, producttype, productcost, productsaleprice, productquantity]
        );

        res.status(201).json(result.rows[0]);
    } catch (err) {
        console.error(err);
        res.status(500).json({error: err.message});
    }
});

//
// PUT update a product
//
router.put("/:productid", async (req, res) => {
    try {
        const { productid } = req.params;
        const { productname, producttype, productcost, productsaleprice, productquantity } = req.body;

        const result = await pool.query(
            "UPDATE products SET productname = $1, producttype = $2, productcost = $3, productsaleprice = $4, productquantity = $5 WHERE productid = $6 RETURNING *",
            [productname, producttype, productcost, productsaleprice, productquantity, productid]
        );

        if (result.rows.length === 0) {
            return res.status(404).json({ error: "Product not found" });
        }

        res.json(result.rows[0]);
    } catch (err) {
        console.error(err);
        res.status(500).json({error: err.message});
    }
});

//
// DELETE a product
//
router.delete("/:productid", async (req, res) => {
    try {
        const { productid } = req.params;

        const result = await pool.query(
            "DELETE FROM products WHERE productid = $1 RETURNING *",
            [productid]
        );

        if (result.rows.length === 0) {
            return res.status(404).json({ error: "Product not found" });
        }

        res.json({ message: "Product deleted", product: result.rows[0] });
    } catch (err) {
        console.error(err);
        res.status(500).json({error: "Database error"});
    }
});

module.exports = router;