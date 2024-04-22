const express = require('express');
const router = express.Router();
const angebotController = require('../controllers/angebotController');

// POST route to create a new Angebot
router.post('/createAngebot', angebotController.createAngebot);

// GET route to retrieve all Angebote for a user
router.get('/getAngebote', angebotController.getAllAngeboteForUser);

module.exports = router;
