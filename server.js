const dotenv = require("dotenv")
const app = require("./index");
const connectDatabase = require("./config/database")

// Handle Uncaught Exception
process.on("uncaughtException", (err) => {
    console.log(`Error: ${err.message}`);
    console.log(`Shutting down the server due to Uncaught Exception`);
});

//Config
dotenv.config({ path: "./config/config.env" });

// Connecting to databsae
connectDatabase()

//server 
const server = app.listen(process.env.PORT, () => {
    console.log(`Server is running on http://localhost:${process.env.PORT}`)
})

// Unhandled promise Rejection
process.on("unhandledRejection", (err) => {
    console.log(`Error: ${err.message}`);
    console.log(`Shutting down the server due to unhandled Promise rejection`);

    server.close(() => {
        process.exit(1);
    });
});