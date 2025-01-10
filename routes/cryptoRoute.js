const express = require("express");
const { fetchCryptoData, getCryptoStats } = require("../controllers/cryptoController");

const router = express.Router();

// Fetch and save crypto data (triggered manually if needed)
router.get("/fetch", fetchCryptoData);

// Get stats for a specific cryptocurrency
router.get("/stats", getCryptoStats);

module.exports = router;
