const { model , Schema} = require('mongoose')

const newBuildingSchema = new Schema({

  buildingName: {
    type: String, 
  },

  buildingBlock: {
    type: String,
  },

  buildingDes: {
    type: String,
  },

})

module.exports = model('Building', newBuildingSchema);
