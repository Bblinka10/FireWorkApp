require("dotenv").config();

const productsRouter = require("./routes/products");

const express = require("express");
const pool = require("./db/connection");

const app = express();
const PORT = 3000;

app.get("/test-db", async (req, res) => {
    const result = await pool.query("SELECT NOW()");
    res.json(result.rows);
});

app.use("/products", productsRouter);
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});