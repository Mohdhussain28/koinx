const express = require("express");
const mongoose = require("mongoose");
const cron = require("node-cron");
const cryptoRoutes = require("./routes/cryptoRoute");
const { fetchCryptoData } = require("./controllers/cryptoController");

const app = express();
app.use(express.json());

// use routes
app.use("/api/cryptos", cryptoRoutes);

// schedule Job to fetch crypto data every 2 Hours
cron.schedule("0 */2 * * *", fetchCryptoData);

// schedule Job to fetch crypto data every 2 min for testing
// cron.schedule("*/2 * * * *", () => {
//     console.log("Running scheduled job...");
//     fetchCryptoData();
// });

module.exports = app