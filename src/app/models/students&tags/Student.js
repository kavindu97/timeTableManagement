const { model , Schema} = require('mongoose')

const newStudentSchema = new Schema({
  acedemicYear: {
    type: String,
  },
  programme: {
    type: String,
  },
  groupCount: {
    type: String,
  },
  subGroupCount: {
    type: String,
  }
})

module.exports = model('Student', newStudentSchema);
