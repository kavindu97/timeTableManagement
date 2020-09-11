const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://user:123@electronttm.zal8h.mongodb.net/TTMDB?retryWrites=true&w=majority', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
  .then(db => console.log('DB is connected'))
  .catch(err => console.log(err));