const Leistung = require('../models/Leistung');
const User = require('../models/User');

exports.createLeistung = async (req, res) => {
    try {
      console.log('Received data:', req.body); // Log the received data
      const leistung = new Leistung({
        ...req.body,
        user: req.user._id,
      });
      await leistung.save();
      await User.findByIdAndUpdate(req.user._id, { $push: { leistungen: leistung._id } });
      res.status(201).json(leistung);
    } catch (error) {
      console.error('Error creating Leistung:', error);
      res.status(400).json({ message: error.message });
    }
  };
  

exports.getAllLeistungen = async (req, res) => {
  try {
    const leistungen = await Leistung.find({ user: req.user._id });
    res.status(200).json(leistungen);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getLeistungById = async (req, res) => {
  try {
    const leistung = await Leistung.findById(req.params.id);
    if (!leistung) {
      return res.status(404).json({ message: 'Leistung not found' });
    }
    res.status(200).json(leistung);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.updateLeistung = async (req, res) => {
  try {
    const leistung = await Leistung.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!leistung) {
      return res.status(404).json({ message: 'Leistung not found' });
    }
    res.status(200).json(leistung);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.deleteLeistung = async (req, res) => {
  try {
    const leistung = await Leistung.findByIdAndDelete(req.params.id);
    if (!leistung) {
      return res.status(404).json({ message: 'Leistung not found' });
    }
    await User.findByIdAndUpdate(req.user._id, { $pull: { leistungen: req.params.id } });
    res.status(200).json({ message: 'Leistung deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
