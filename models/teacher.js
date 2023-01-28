const mongoose = require("mongoose");
const teacherSchema = mongoose.Schema({
  name: { type: String, required: true },
  highestDegree: String,
  img: String,
  subjects: String,
  description: String,
});

module.exports = mongoose.model("Teacher", teacherSchema);
