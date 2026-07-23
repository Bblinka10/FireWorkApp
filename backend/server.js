require("dotenv").config();
const cors = require("cors");
const path = require("path");

const productsRouter = require("./routes/products");
const salesRouter = require("./routes/sales");
const uploadRoutes = require("./routes/upload")

const express = require("express");
const pool = require("./db/connection");

const app = express();
const PORT = 3000;

app.get("/test-db", async (req, res) => {
    const result = await pool.query("SELECT NOW()");
    res.json(result.rows);
});

app.use(cors());
app.use(express.json());
app.use("/products", productsRouter);
app.use("/sales", salesRouter);
app.use("/uploads", express.static(path.join(__dirname, "uploads")));
app.use("/upload", uploadRoutes);
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});