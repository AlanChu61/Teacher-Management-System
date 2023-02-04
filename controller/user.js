const express = require("express");
const router = express.Router();
const User = require("../models/user");
const bcrypt = require("bcrypt");

// Sign up users
router.get("/signup", (req, res) => {
  res.render("signup.ejs");
});

//handle form submission
router.post("/signup", (req, res) => {
  const hashedPassword = bcrypt.hashSync(req.body.password, 10);
  req.body.password = hashedPassword;
  User.create(req.body, (err, newUser) => {
    req.session.userId = newUser._id;
    res.redirect("/teachers");
  });
});

//Login Users
router.get("/login", (req, res) => {
  res.render("login.ejs");
});
// handle form submission
router.post("/login", (req, res) => {
  // 1) loop up the user using the email
  User.findOne({ email: req.body.email }, (err, foundUser) => {
    // console.log(err);
    // console.log(foundUser);
    // 1.1) if the user not found, redirect to the login
    if (!foundUser) return res.redirect("/login");
    // 1.2) if the user exists, we caompare password to determine a match
    const isMatched = bcrypt.compareSync(req.body.password, foundUser.password);
    if (!isMatched) {
      return res.redirect("/login");
    }
    // create a new session for the authenticated user- they are now logged in
    req.session.userId = foundUser._id;
    res.redirect("/teachers");
  });
});

//Logout Users
router.get("/logout", (req, res) => {
  req.session.destroy((err) => {
    res.redirect("/");
  });
});
//export
module.exports = router;
