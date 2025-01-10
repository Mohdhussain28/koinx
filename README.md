# Cryptocurrency Data API

This project provides an API to fetch, store, and analyze cryptocurrency data for **Bitcoin**, **Matic**, and **Ethereum**. It includes endpoints to get the latest price, market cap, 24-hour change, and the standard deviation of the cryptocurrency prices based on historical data.

## Features

- Fetch and store cryptocurrency data every 2 hours.
- Fetch the latest price, market cap, and 24-hour change for **Bitcoin**, **Matic**, and **Ethereum**.
- Calculate the standard deviation of cryptocurrency prices from the last 100 records stored in the database.

## API Endpoints

### 1. `GET /api/cryptos/fetch`
### 2. `GET /api/cryptos/stats`
### 3. `GET /api/cryptos/deviation`

**Description**: Fetches and stores the latest cryptocurrency data (Bitcoin, Matic, Ethereum) every 2 hours.

### Summary of Changes:
1. **Added the `/api/cryptos/all` endpoint**: 
   - This endpoint returns a list of all cryptocurrencies available in the database, along with their most recent data.
2. **Clarified existing endpoints**: 
   - `/api/cryptos/fetch`: Fetches and stores the latest data.
   - `/api/cryptos/stats`: Retrieves the latest price, market cap, and 24h change.
   - `/api/cryptos/deviation`: Computes and returns the standard deviation of the last 100 records.
  

