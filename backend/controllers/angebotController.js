exports.createAngebot = async (req, res) => {
    try {
        const newAngebot = new Angebot({ ...req.body, user: req.user._id });
        await newAngebot.save();
        res.status(201).json(newAngebot);
    } catch (error) {
        res.status(400).json({ error: "Failed to create Angebot", details: error });
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
