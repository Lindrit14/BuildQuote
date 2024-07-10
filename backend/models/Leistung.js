const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const leistungSchema = new Schema({
  leistungTitel: {
    type: String,
    required: true
  },
  leistungDetail: {
    type: String,
    required: true
  },
  leistungEinheit: {
    type: String,
    required: true
  },
  leistungEinheitspreis: {
    type: Number,
    required: true
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }
});

module.exports = mongoose.model('Leistung', leistungSchema);
