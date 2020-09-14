const { model , Schema} = require('mongoose')

const newRoomSchema = new Schema({

    roomName: {
        type: String, 
     },

    roomCapacity: {
        type: String,
    },

    roomType: {
        type: String,
    },

})

module.exports = model('Room', newRoomSchema);