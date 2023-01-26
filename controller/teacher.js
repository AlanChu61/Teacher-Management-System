const express = require("express");
const router = express.Router();
const data = require("../data");
const Teacher = require("../models/teacher");

//routes
router.get("/teachers/seed", (req, res) => {
  Teacher.deleteMany({}, (error, results) => {
    Teacher.create(data, (error, teachers) => {
      // console.log(error, teachers);
      res.redirect("/teachers");
    });
  });
});
router.get("/", (req, res) => {
  res.redirect("/teachers");
});
//i
router.get("/teachers", (req, res) => {
  Teacher.find({}, (error, allTeachers) => {
    // console.log(allTeachers);
    res.render("index.ejs", { teachers: allTeachers });
  });
});
//n
//d
//u
//c
//e
router.get("/teachers/:objId/edit", (req, res) => {
  Teacher.findById(req.params.objId, (error, foundTeacher) => {
    res.render("edit.ejs", { teacher: foundTeacher });
  });
});
//s
router.get("/teachers/:objId", (req, res) => {
  Teacher.findById(req.params.objId, (error, foundTeacher) => {
    res.render("show.ejs", {
      teacher: foundTeacher,
    });
  });
});
module.exports = router;
