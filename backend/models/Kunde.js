const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const kundenSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  plz: {
    type: String,
    required: true,
  },
  ort: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  phoneNumber: {
    type: String,
    required: true,
  },
  otherInfo: {
    type: String,
    required: false,
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
}, { timestamps: true });

module.exports = mongoose.model('Kunden', kundenSchema);
