const express = require("express");
const router = express.Router();
const upload = require("../upload");

router.post("/", upload.single("image"), (req, res) => {

    res.json({
        filename: req.file.filename
    });
});

module.exports = router;