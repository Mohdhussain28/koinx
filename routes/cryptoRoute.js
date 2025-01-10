const express = require("express");
const { fetchCryptoData, getCryptoStats, getPriceDeviation } = require("../controllers/cryptoController");

const router = express.Router();

// Fetch and save crypto data (triggered manually if needed)
router.get("/fetch", fetchCryptoData);

// Get stats for a specific cryptocurrency
router.get("/stats", getCryptoStats);

// Get price deviation for the last 100 records of a cryptocurrency
router.get("/deviation", getPriceDeviation);

module.exports = router;
