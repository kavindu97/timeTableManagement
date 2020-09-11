const { model, Schema } = require("mongoose");

const newSubjectSchema = new Schema({
  offeredYear: {
    type: String,
  },
  offeredSemester: {
    type: String,
  },
  subjectCode: {
    type: String,
  },
  lectureHour: {
    type: String,
  },
  lectureMinute: {
    type: String,
  },
  tutorialHour: {
    type: String,
  },
  tutorialMinute: {
    type: String,
  },
  labHour: {
    type: String,
  },
  labMinute: {
    type: String,
  },
  evaluationHour: {
    type: String,
  },
  evaluationMinute: {
    type: String,
  },
});

module.exports = model("Subject", newSubjectSchema);
