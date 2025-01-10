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
        res.status(200).json({ message: "Crypto data fetched and saved." });
    } catch (error) {
        console.error("Error fetching data from CoinGecko:", error.message);
        res.status(500).json({ error: "Failed to fetch crypto data." });
    }
};

// Get the latest stats for a specific cryptocurrency
const getCryptoStats = async (req, res) => {
    const coin = req.query?.coin;

    if (!coin) {
        return res.status(400).json({ error: "Coin query parameter is required." });
    }

    try {
        // Fetch the latest record for the specified coin
        const crypto = await Crypto.findOne({ coinId: coin }).sort({ fetchedAt: -1 });

        if (!crypto) {
            return res.status(404).json({ error: `No data found for coin: ${coin}` });
        }

        const response = {
            price: crypto.currentPrice,
            marketCap: crypto.marketCap,
            "24hChange": crypto.change24h,
        };

        res.status(200).json({ message: "Crypto data successfully fetched", response });
    } catch (error) {
        console.error("Error fetching cryptocurrency stats:", error.message);
        res.status(500).json({ error: "Failed to fetch cryptocurrency stats." });
    }
};

// Get the standard deviation of prices for the last 100 records
const getPriceDeviation = async (req, res) => {
    const coin = req.query?.coin;

    if (!coin) {
        return res.status(400).json({ error: "Coin query parameter is required." });
    }

    try {
        // Fetch the last 100 records for the specified coin
        const records = await Crypto.find({ coinId: coin })
            .sort({ fetchedAt: -1 })
            .limit(100);

        if (!records || records.length === 0) {
            return res.status(404).json({ error: `No data found for coin: ${coin}` });
        }

        // Extract prices from the records
        const prices = records.map(record => record.currentPrice);

        // Calculate mean
        const mean = prices.reduce((sum, price) => sum + price, 0) / prices.length;

        // Calculate variance
        const variance = prices.reduce((sum, price) => sum + Math.pow(price - mean, 2), 0) / prices.length;

        // Calculate standard deviation
        const deviation = Math.sqrt(variance).toFixed(2);

        res.status(200).json({ message: "successfully get the deviation result", deviation: parseFloat(deviation) });
    } catch (error) {
        console.error("Error in calculation", error.message);
        res.status(500).json({ error: "Failed to calculate price deviation." });
    }
};


module.exports = { fetchCryptoData, getCryptoStats, getPriceDeviation };
