const { application } = require("express");
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
//index
router.get("/teachers", (req, res) => {
  Teacher.find({}, (error, allTeachers) => {
    // console.log(allTeachers);
    res.render("index.ejs", { teachers: allTeachers });
  });
});
//new
router.get("/teachers/new", (req, res) => {
  res.render("new.ejs");
});

//delete
router.delete("/teachers/:objId", (req, res) => {
  Teacher.findByIdAndDelete(req.params.objId, (error, deletebook) => {
    res.redirect("/teachers");
  });
});
//update
router.put("/teachers/:objId", (req, res) => {
  console.log(req.body);
  const updateTeacher = req.body;
  Teacher.findByIdAndUpdate(
    req.params.objId,
    updateTeacher,
    (err, updatedTeacher) => {
      console.log(err);
      res.redirect(`/teachers`);
    }
  );
});
//create
router.post("/teachers", (req, res) => {
  const createdYeacher = req.body;
  teacher.create(createdYeacher, (error, createdTeacher) => {
    res.redirect("/");
  });
});
//edit
router.get("/teachers/:objId/edit", (req, res) => {
  Teacher.findById(req.params.objId, (error, foundTeacher) => {
    res.render("edit.ejs", { teacher: foundTeacher });
  });
});
//show
router.get("/teachers/:objId", (req, res) => {
  Teacher.findById(req.params.objId, (error, foundTeacher) => {
    res.render("show.ejs", {
      teacher: foundTeacher,
    });
  });
});
module.exports = router;
