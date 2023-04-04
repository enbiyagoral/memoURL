const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UrlSchema = new Schema({
  name: {
    type: String,
    unique: true,
  },
  description: {
    type: String,
  },
  date: {
    type: Date,
    default: Date.now(),
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  }
  
});

module.exports = mongoose.model('Url', UrlSchema);

