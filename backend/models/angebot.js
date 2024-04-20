const mongoose = require('mongoose');

const AngebotItemSchema = new mongoose.Schema({
    position: Number,
    quantity: Number,
    unit: String,
    description: String,
    unitPrice: Number,
    total: Number
}, { _id: false });

const AngebotSchema = new mongoose.Schema({
    clientName: { type: String, required: true },
    clientAddress: String,
    clientEmail: String,
    dateIssued: { type: Date, default: Date.now },
    offerNumber: { type: String, required: true, unique: true },
    projectLocation: String,
    items: [AngebotItemSchema],
    netTotal: Number,
    vat: Number,
    grossTotal: Number,
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }
});

module.exports = mongoose.model('Angebot', AngebotSchema);
