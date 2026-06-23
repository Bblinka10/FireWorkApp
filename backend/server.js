require("dotenv").config();

const productsRouter = require("./routes/products");
const salesRouter = require("./routes/sales");

const express = require("express");
const pool = require("./db/connection");

const app = express();
const PORT = 3000;

app.get("/test-db", async (req, res) => {
    const result = await pool.query("SELECT NOW()");
    res.json(result.rows);
});

app.use(express.json());
app.use("/products", productsRouter);
app.use("/sales", salesRouter);
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});