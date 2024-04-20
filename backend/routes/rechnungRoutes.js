const express = require('express');
const router = express.Router();
const rechnungController = require('../controllers/rechnungController');

// POST route to create a new Rechnung
router.post('/rechnungen', rechnungController.createRechnung);

// GET route to retrieve all Rechnungen for a user
router.get('/rechnungen', rechnungController.getAllRechnungenForUser);

module.exports = router;
