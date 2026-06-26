const express = require("express");
const router = express.Router();
const pool = require("../db/connection");


//
// GET all sales
//

    router.get("/", async (req, res) => {
        try {
            const result = await pool.query("SELECT * FROM sales ORDER BY saleid");
            res.json(result.rows);
        }
        catch (err) {
            console.error(err);
            res.status(500).json({ error: err.message });
        }
    });

//
// GET one sale by ID
//
router.get("/:saleid", async (req, res) => {
    try {
        const { saleid } = req.params;
        
        const result = await pool.query(
            "SELECT * FROM sales WHERE saleid = $1",
            [saleid]
        );

        if (result.rows.length === 0) {
            return res.status(404).json({ error: "Sale not found" });
        }

        res.json(result.rows[0]);
    }
    catch (err) {
        console.error(err);
        res.status(500).json({ error: err.message });
    }
});

//
// POST a new sale
//
router.post("/", async (req, res) => {
    const client = await pool.connect();

    try {
        await client.query("BEGIN");

        const { items } = req.body;

        //Create sale
        const result = await client.query(
            "INSERT INTO sales DEFAULT VALUES RETURNING saleid"
        );

        const saleid = result.rows[0].saleid;

        let saletotal = 0;

        //Process items
        for (const item of items) {
            const { productid, quantity } = item;

            //Get product info
            const productResult = await client.query(
                "SELECT * FROM products WHERE productid = $1",
                [productid]
            );

            const product = productResult.rows[0];

            if (!product) {
                throw new Error(`Product ${productid} not found`);
            }

            if (product.productquantity < quantity) {
                throw new Error(`${product.productname} inventory too low. Available: ${product.productquantity}.`

                );
            }

            const lineTotal = product.productsaleprice * quantity;
            saletotal += lineTotal;

            //Add item to saleitems
            await client.query(
                "INSERT INTO saleitems (saleid, productid, quantity) VALUES ($1, $2, $3)",
                [saleid, productid, quantity]
            );

            //Reduce inventory
            await client.query(
                "UPDATE products SET productquantity = productquantity - $1 WHERE productid = $2",
                [quantity, productid]
            );
        }

        await client.query(
            "UPDATE sales SET saletotal = $1 WHERE saleid = $2",
            [saletotal, saleid]
        );

        await client.query("COMMIT");

        res.status(201).json({ message: "Sale created successfully", saleid });

    }
    catch (err) {
        await client.query("ROLLBACK");

        console.error(err);
        res.status(500).json({ error: err.message });
    }
    finally {
        client.release();
    }
});

module.exports = router;