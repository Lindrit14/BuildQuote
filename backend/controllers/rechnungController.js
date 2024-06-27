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

exports.getAllRechnungenForUser = async (req, res) => {
    try {
        const rechnungen = await Rechnung.find({ user: req.user._id });
        res.status(200).json(rechnungen);
    } catch (error) {
        res.status(500).json({ error: "Failed to retrieve Rechnungen", details: error });
    }
};
