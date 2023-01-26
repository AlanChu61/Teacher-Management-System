// Dependencies
const express = require("express");

//initial the application
const app = express();

// config setting
require("dotenv").config();
const PORT = process.env.PORT;

//Listerning
app.listen(PORT, () => {
  console.log(`Server is listening on PORT: ${PORT}`);
});
