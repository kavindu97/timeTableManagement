const { model , Schema} = require('mongoose')

const newWorkingSchema = new Schema({
  numberOfWorking: {
    type: String,
  },
  monday: {
    type: String,

  },
  tuesday: {
    type: String,
  },
  wednesday: {
    type: String,
  },
  thursday: {
    type: String,
  },
  friday: {
    type: String,
  },
  saturday: {
    type: String,
  },
  sunday: {
    type: String,
  },
  hours: {
    type: String,
  },
  minutes: {
    type: String,
  }
})

module.exports = model('Working', newWorkingSchema);