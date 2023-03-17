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
});

const Url = mongoose.model('Url', UrlSchema);
module.exports = Url;
