const Crypto = require("../models/cryptoModel");
const axios = require("axios");

// Fetch crypto data from CoinGecko and save to the database
const fetchCryptoData = async (req, res) => {
    const coinIds = ["bitcoin", "matic-network", "ethereum"];
    const url = `https://api.coingecko.com/api/v3/simple/price`;
    const params = {
        ids: coinIds.join(","),
        vs_currencies: "usd",
        include_market_cap: true,
        include_24hr_change: true,
    };

    const headers = {
        accept: "application/json",
        "x-cg-demo-api-key": process.env.API_KEY,
    };

    try {
        const response = await axios.get(url, { params, headers });
        const data = response.data;

        const cryptoEntries = coinIds.map((id) => ({
            coinId: id,
            name: id.replace("-", " ").toUpperCase(),
            currentPrice: data[id].usd,
            marketCap: data[id].usd_market_cap,
            change24h: data[id].usd_24h_change,
        }));

        await Crypto.insertMany(cryptoEntries);
        console.log("Crypto data updated successfully!");
        if (res) res.status(200).json({ message: "Crypto data fetched and saved." });
    } catch (error) {
        console.error("Error fetching data from CoinGecko:", error.message);
        if (res) res.status(500).json({ error: "Failed to fetch crypto data." });
    }
};


module.exports = { fetchCryptoData };
