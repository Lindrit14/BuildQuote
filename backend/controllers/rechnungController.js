exports.createRechnung = async (req, res) => {
    try {
        const newRechnung = new Rechnung({ ...req.body, user: req.user._id });
        await newRechnung.save();
        res.status(201).json(newRechnung);
    } catch (error) {
        res.status(400).json({ error: "Failed to create Rechnung", details: error });
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
