const Angebot = require('../models/angebot')
const Rechnung = require('../models/rechnung'); 
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
    try {
        const { id } = req.params;
        const updateData = req.body;
        const updatedAngebot = await Angebot.findByIdAndUpdate(id, updateData, { new: true });
        if (!updatedAngebot) {
            return res.status(404).json({ message: "Angebot not found" });
        }
        res.status(200).json(updatedAngebot);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};



// Function to convert Angebot to Rechnung
exports.convertAngebotToRechnung = async (req, res) => {
  try {
    const { id } = req.params;
    const angebot = await Angebot.findById(id);

    if (!angebot) {
      return res.status(404).json({ message: 'Angebot not found' });
    }

    const newRechnung = new Rechnung({
      clientName: angebot.clientName,
      clientAddress: angebot.clientAddress,
      clientEmail: angebot.clientEmail,
      offerNumber: angebot.offerNumber, // You might want to generate a new number
      projectLocation: angebot.projectLocation,
      items: angebot.items,
      netTotal: angebot.netTotal,
      vat: angebot.vat,
      grossTotal: angebot.grossTotal,
      user: angebot.user,
      documentNumber: `R-${Date.now()}`, // Assuming you use this format for Rechnungen
      date: new Date(),
    });

    await newRechnung.save();

    res.status(201).json(newRechnung);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
