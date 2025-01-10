const mongoose = require("mongoose");

const cryptoSchema = new mongoose.Schema({
    coinId: { type: String, required: true },
    name: { type: String, required: true },
    currentPrice: { type: Number, required: true },
    marketCap: { type: Number },
    change24h: { type: Number },
    fetchedAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Crypto", cryptoSchema);
