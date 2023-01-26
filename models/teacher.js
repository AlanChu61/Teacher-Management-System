const mongoose = require("mongoose");
const teacherSchema = mongoose.Schema({
  name: { type: String, required: true },
  highestDegree: { type: String, required: true },
  currentJob: { type: String, required: true },
  img: String,
  subjects: String,
  availableTime: String,
  acceptNewStus: Boolean,
});

module.exports = mongoose.model("Teacher", teacherSchema);
