const Angebot = require('../models/angebot')

// Controller to create an Angebot
exports.createAngebot = async (req, res) => {
    try {
        const { clientName, clientAddress, clientEmail, offerNumber, projectLocation, items, netTotal, vat, grossTotal } = req.body;
        const newAngebot = new Angebot({
            clientName,
            clientAddress,
            clientEmail,
            offerNumber,
            projectLocation,
            items,
            netTotal,
            vat,
            grossTotal,
            user: req.user._id 
        });
        await newAngebot.save();
        res.status(201).json(newAngebot);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

exports.getAllAngeboteForUser = async (req, res) => {
    try {
        const angebote = await Angebot.find({ user: req.user._id });
        res.status(200).json(angebote);
    } catch (error) {
        res.status(500).json({ error: "Failed to retrieve Angebote", details: error });
    }
    
};
