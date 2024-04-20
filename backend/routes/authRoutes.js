const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');  // Ensure path is correct

// Google OAuth authentication routes
router.get('/google', authController.login);

router.get('/google/redirect', authController.redirect);

router.get("/logout", authController.logout);

router.get("/failure", authController.failure);

module.exports = router;
