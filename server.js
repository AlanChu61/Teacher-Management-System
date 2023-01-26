// Dependencies
const express = require("express");
const mongoose = require("mongoose");

//initial the application
const app = express();

// config setting
require("dotenv").config();
const PORT = process.env.PORT;
const DATABASE_URL = process.env.DATABASE_URL;

// establish connection to DB
mongoose.set("strictQuery", true);
mongoose.connect(DATABASE_URL);

const db = mongoose.connection;
db.on("error", (err) => console.log(err.message + " is mongo not running?"));
db.on("connected", () => console.log("mongoDB connected"));
// routes

//Listerning
app.listen(PORT, () => {
  console.log(`Server is listening on PORT: ${PORT}`);
});
