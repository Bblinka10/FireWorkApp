const express = require("express");
const router = express.Router();
const pool = require("../db/connection");


//
// POST a new sale
//
router.post("/", async (req, res) => {
    try {
        const { items } = req.body;

        //Create sale
        const result = await pool.query(
            "INSERT INTO sales DEFAULT VALUES RETURNING saleid"
        );

        const saleid = result.rows[0].saleid;

        //Process items
        for (const item of items) {
            const { productid, quantity } = item;

            //Get product info
            const productResult = await pool.query(
                "SELECT * FROM products WHERE productid = $1",
                [productid]
            );

            const product = productResult.rows[0];

            //Add item to saleitems
            await pool.query(
                "INSERT INTO saleitems (saleid, productid, quantity) VALUES ($1, $2, $3)",
                [saleid, productid, quantity]
            );

            //Reduce inventory
            await pool.query(
                "UPDATE products SET productquantity = productquantity - $1 WHERE productid = $2",
                [quantity, productid]
            );
        }

        res.status(201).json({ message: "Sale created successfully", saleid });

    }
    catch (err) {
        console.error(err);
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;