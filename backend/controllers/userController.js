// File: backend/controllers/userController.js
const User = require('../models/User');
        
exports.createUser = async (req, res) => {
    try {
        const user = new User(req.body);
        await user.save();
        res.status(201).send(user);
    } catch (error) {
        res.status(400).send(error);
    }
};


exports.getAllUsers = async (req, res) => {
    try {
        const users = await User.find({});
        res.status(200).json(users);
    } catch (error) {
        res.status(500).send(error);
    }
};

exports.updateUser = async (req, res) => {
    const { id } = req.params;
    const update = req.body;
    try {
        const user = await User.findByIdAndUpdate(id, update, { new: true });
        if (!user) {
            return res.status(404).send("No user found with that ID.");
        }
        res.status(200).json(user);
    } catch (error) {
        res.status(400).send(error);
    }
};

exports.deleteUser = async (req, res) => {
    const { id } = req.params;
    try {
        const result = await User.findByIdAndDelete(id);
        if (!result) {
            return res.status(404).send("No user found with that ID.");
        }
        res.status(200).send("User deleted successfully.");
    } catch (error) {
        res.status(400).send(error);
    }
};
