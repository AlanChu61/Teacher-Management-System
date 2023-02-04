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
    //console.log(Object.keys(req.query).length == 0);
    if (Object.keys(req.query).length == 0) {
      res.render("index.ejs", { teachers: allTeachers, title: "HomePage" });
    } else {
      const subject = req.query.subject;
      const teacherArr = [];
      for (let teacher of allTeachers) {
        const teacherSubList = teacher.subjects.split(", ");
        // console.log(teacherSubList);
        // for (let i = 0; i <= teacherSubList.length; i++) {
        //   console.log(teacherSubList[i]);
        //   // teacherSubList[i] = teacherSubList[i].trim();
        // }
        if (teacherSubList.includes(subject)) {
          teacherArr.push(teacher);
        }
      }
      // console.log(teacherArr);
      res.render("subject.ejs", { teachers: teacherArr, title: subject });
    }
  });
});

//new
router.get("/teachers/new", (req, res) => {
  res.render("new.ejs", { title: "Add New Teacher" });
});

//delete
router.delete("/teachers/:objId", (req, res) => {
  Teacher.findByIdAndDelete(req.params.objId, (error, deletebook) => {
    res.redirect("/teachers");
  });
});
//update
router.put("/teachers/:objId", (req, res) => {
  //console.log(req.body);
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
  Teacher.create(createdYeacher, (error, createdTeacher) => {
    res.redirect("/");
  });
});
//edit
router.get("/teachers/:objId/edit", (req, res) => {
  Teacher.findById(req.params.objId, (error, foundTeacher) => {
    res.render("edit.ejs", {
      teacher: foundTeacher,
      title: `Edit ${foundTeacher.name}'s Info`,
    });
  });
});
//show
router.get("/teachers/:objId", (req, res) => {
  Teacher.findById(req.params.objId, (error, foundTeacher) => {
    res.render("show.ejs", {
      teacher: foundTeacher,
      title: `${foundTeacher.name}'s Info`,
    });
  });
});
module.exports = router;
