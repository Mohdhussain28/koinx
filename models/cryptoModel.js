const mongoose = require("mongoose");

const cryptoSchema = new mongoose.Schema({
    coinId: String,
    name: String,
    currentPrice: Number,
    marketCap: Number,
    change24h: Number,
    fetchedAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Crypto", cryptoSchema);
