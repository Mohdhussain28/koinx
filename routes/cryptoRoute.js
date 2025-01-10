const express = require("express");
const { fetchCryptoData } = require("../controllers/cryptoController");

const router = express.Router();

// Fetch and save crypto data (triggered manually if needed)
router.get("/fetch", fetchCryptoData);


module.exports = router;
