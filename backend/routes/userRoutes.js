// File: backend/routes/userRoutes.js
const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const User = require('../models/User'); // make sure the path is correct to your User model

// POST new user
router.post('/users', userController.createUser);

// GET all users
router.get('/users', userController.getAllUsers);

// PUT update user
router.put('/users/:id', userController.updateUser);

// DELETE a user
router.delete('/users/:id', userController.deleteUser);

module.exports = router;
