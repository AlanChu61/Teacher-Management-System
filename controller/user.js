const express = require("express");
const router = express.Router();
const User = require("../models/user");

//signup
router.get("/signup", (req, res) => {
  res.render("signup.ejs");
});

module.exports = router;
