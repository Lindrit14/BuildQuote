const Angebot = require('../models/angebot');
const Rechnung = require('../models/rechnung'); // Assuming you have a Rechnung model

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

// Controller to get all Angebote for a user
exports.getAllAngeboteForUser = async (req, res) => {
    try {
        const angebote = await Angebot.find({ user: req.user._id });
        res.status(200).json(angebote);
    } catch (error) {
        res.status(500).json({ error: "Failed to retrieve Angebote", details: error });
    }
};

// Controller to update an Angebot
exports.updateAngebot = async (req, res) => {
    const { id } = req.params;
    const update = req.body;
    try {
        const angebot = await Angebot.findByIdAndUpdate(id, update, { new: true });
        if (!angebot) {
            return res.status(404).send("No Angebot found with that ID.");
        }
        res.status(200).json(angebot);
    } catch (error) {
        res.status(400).send(error);
    }
};

// Controller to delete an Angebot
exports.deleteAngebot = async (req, res) => {
    const { id } = req.params;
    try {
        const result = await Angebot.findByIdAndDelete(id);
        if (!result) {
            return res.status(404).send("No Angebot found with that ID.");
        }
        res.status(200).send("Angebot deleted successfully.");
    } catch (error) {
        res.status(400).send(error);
    }
};

exports.convertAngebotToRechnung = async (req, res) => {
    try {
      const { id } = req.params;
      const angebot = await Angebot.findById(id);
      if (!angebot) {
        return res.status(404).json({ message: 'Angebot not found' });
      }
  
      const rechnungData = {
        clientName: angebot.clientName,
        clientAddress: angebot.clientAddress,
        clientEmail: angebot.clientEmail,
        clientPhone: angebot.clientPhone,
        offerNumber: angebot.offerNumber,
        documentNumber: angebot.documentNumber,
        projectLocation: angebot.projectLocation,
        date: new Date().toLocaleDateString(),
        dueDate: '2024-07-01T00:00:00.000+00:00', 
        invoiceNumber: `INV-${Date.now()}`, 
        items: angebot.items,
        netTotal: angebot.netTotal,
        vat: angebot.vat,
        grossTotal: angebot.grossTotal,
        companyName: angebot.companyName,
        companyAddress: angebot.companyAddress,
        companyContact: angebot.companyContact,
        footerText: angebot.footerText,
        user: req.user._id 
      };
  
      const newRechnung = new Rechnung(rechnungData);
      await newRechnung.save();
  
      res.status(201).json(newRechnung);
    } catch (error) {
      console.error('Error converting Angebot to Rechnung:', error);
      res.status(500).json({ message: 'Error converting Angebot to Rechnung', error });
    }
  };