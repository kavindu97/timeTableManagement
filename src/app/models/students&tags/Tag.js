const { model , Schema} = require('mongoose')

const newTagSchema = new Schema({
  category: {
    type: String,
  },
  batch: {
    type: String,
  },
  group: {
    type: String,
  },
  subject: {
    type: String,
  },
  startingTime: {
    type: String,
  },
  endingTime: {
    type: String,
  },
  note: {
    type: String,
  }
})

module.exports = model('Tag', newTagSchema);
