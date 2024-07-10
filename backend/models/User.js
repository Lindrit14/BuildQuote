// File: backend/models/User.js
const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const userSchema = new mongoose.Schema({
    googleId: { type: String, required: true, unique: true },   
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    picture: { type: String, required: false },
    address: { type: String, required: false },
    phone: { type: String, required: false },
    kunden: [{ type: Schema.Types.ObjectId, ref: 'Kunden' }],
    leistungen: [{ type: Schema.Types.ObjectId, ref: 'Leistung' }],
}); 

module.exports = mongoose.model('User', userSchema);
