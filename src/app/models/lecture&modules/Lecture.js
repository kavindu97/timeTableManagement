const { model, Schema } = require("mongoose");

const newLectureSchema = new Schema({
  name: {
    type: String,
  },
  employeeID: {
    type: String,
  },
  faculty: {
    type: String,
  },
  department: {
    type: String,
  },
  center: {
    type: String,
  },
  building: {
    type: String,
  },
  category: {
    type: String,
  },
});

module.exports = model("Lecture", newLectureSchema);
