const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UrlSchema = new Schema({
  url: {
    type: String,
    unique: true,
  },
  note: {
    type: String,
  },
  date: {
    type: Date,
    default: Date.now(),
  },
});

const Url = mongoose.model('Url', UrlSchema);
module.exports = Url;
