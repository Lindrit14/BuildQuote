// models/project.js
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const projectSchema = new Schema({
  projectName: {
    type: String,
    required: true
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  angebote: [{
    type: Schema.Types.ObjectId,
    ref: 'Angebot'
  }],
  rechnungen: [{
    type: Schema.Types.ObjectId,
    ref: 'Rechnung'
  }]
});

const Project = mongoose.model('Project', projectSchema);

module.exports = Project;
