const Rechnung = require('../models/rechnung');

// Controller to create a Rechnung
exports.createRechnung = async (req, res) => {
    try {
        const { clientName, clientAddress, clientEmail, invoiceNumber, issueDate, dueDate, items, netTotal, vatRate, vatAmount, grossTotal } = req.body;
        const newRechnung = new Rechnung({
            clientName,
            clientAddress,
            clientEmail,
            invoiceNumber,
            issueDate,
            dueDate,
            items,
            netTotal,
            vatRate,
            vatAmount,
            grossTotal,
            user: req.user._id
        });
        await newRechnung.save();
        res.status(201).json(newRechnung);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Controller to retrieve all Rechnungen for a user
exports.getAllRechnungenForUser = async (req, res) => {
    try {
        const rechnungen = await Rechnung.find({ user: req.user._id });
        res.status(200).json(rechnungen);
    } catch (error) {
        res.status(500).json({ error: "Failed to retrieve Rechnungen", details: error });
    }
};

// Controller to update an existing Rechnung
exports.updateRechnung = async (req, res) => {
    try {
        const updatedRechnung = await Rechnung.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.status(200).json(updatedRechnung);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Controller to delete an existing Rechnung
exports.deleteRechnung = async (req, res) => {
    try {
        await Rechnung.findByIdAndDelete(req.params.id);
        res.status(200).json({ message: 'Rechnung deleted successfully' });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};
