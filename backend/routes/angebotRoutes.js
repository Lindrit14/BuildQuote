const express = require('express');
const router = express.Router();
const angebotController = require('../controllers/angebotController');

// POST route to create a new Angebot
router.post('/createAngebot', angebotController.createAngebot);

// GET route to retrieve all Angebote for a user
router.get('/getAngebote', angebotController.getAllAngeboteForUser);

// Route to convert Angebot to Rechnung
router.post('/convertAngebotToRechnung/:id', angebotController.convertAngebotToRechnung);

// PUT route to update an existing Angebot
router.put('/updateAngebot/:id', angebotController.updateAngebot);

module.exports = router;
