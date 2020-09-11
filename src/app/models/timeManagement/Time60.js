const { model , Schema} = require('mongoose')

const newTime60Schema = new Schema({
  startingTime60: {
    type: String,
  },
  endingTime60: {
    type: String,
  }
})

module.exports = model('Time60', newTime60Schema);