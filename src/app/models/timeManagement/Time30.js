const { model , Schema} = require('mongoose')

const newTime30Schema = new Schema({
  startingTime30: {
    type: String,
  },
  endingTime30: {
    type: String,
  }
})

module.exports = model('Time30', newTime30Schema);
