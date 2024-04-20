const mongoose = require('mongoose');

const RechnungItemSchema = new mongoose.Schema({
    description: String,
    quantity: Number,
    unitPrice: Number,
    total: Number
}, { _id: false });

const RechnungSchema = new mongoose.Schema({
    clientName: { type: String, required: true },
    clientAddress: String,
    clientEmail: String,
    invoiceNumber: { type: String, required: true, unique: true },
    issueDate: { type: Date, default: Date.now },
    dueDate: { type: Date, required: true },
    items: [RechnungItemSchema],
    netTotal: Number,
    vatRate: Number,
    vatAmount: Number,
    grossTotal: Number,
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }
});

module.exports = mongoose.model('Rechnung', RechnungSchema);
