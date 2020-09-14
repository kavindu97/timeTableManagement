const { model , Schema} = require('mongoose')

const newWorkingHoursSchema = new Schema({
  hours: {
    type: String,
  },
  minutes: {
    type: String,
  },
})

module.exports = model('WorkingHours', newWorkingHoursSchema);