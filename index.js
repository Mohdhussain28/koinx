const express = require("express")
const bodyParser = require("body-parser")
const app = express();
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.json())

module.exports = app