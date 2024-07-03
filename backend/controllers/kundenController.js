const Kunden = require('../models/Kunde');
const User = require('../models/User');

exports.createKunden = async (req, res) => {
  try {
    const kunden = new Kunden({
      ...req.body,
      user: req.user._id,
    });
    await kunden.save();
    await User.findByIdAndUpdate(req.user._id, { $push: { kunden: kunden._id } });
    res.status(201).json(kunden);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.getAllKunden = async (req, res) => {
  try {
    const kunden = await Kunden.find({ user: req.user._id });
    res.status(200).json(kunden);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getKundenById = async (req, res) => {
  try {
    const kunden = await Kunden.findById(req.params.id);
    if (!kunden) {
      return res.status(404).json({ message: 'Kunden not found' });
    }
    res.status(200).json(kunden);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.updateKunden = async (req, res) => {
  try {
    const kunden = await Kunden.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!kunden) {
      return res.status(404).json({ message: 'Kunden not found' });
    }
    res.status(200).json(kunden);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.deleteKunden = async (req, res) => {
  try {
    const kunden = await Kunden.findByIdAndDelete(req.params.id);
    if (!kunden) {
      return res.status(404).json({ message: 'Kunden not found' });
    }
    await User.findByIdAndUpdate(req.user._id, { $pull: { kunden: req.params.id } });
    res.status(200).json({ message: 'Kunden deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
