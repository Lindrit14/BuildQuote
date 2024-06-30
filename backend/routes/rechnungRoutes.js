const express = require('express');
const router = express.Router();
const rechnungController = require('../controllers/rechnungController');

// POST route to create a new Rechnung
router.post('/createRechnung', rechnungController.createRechnung);

// GET route to retrieve all Rechnungen for a user
router.get('/getRechnungen', rechnungController.getAllRechnungenForUser);

// PUT route to update an existing Rechnung
router.put('/updateRechnung/:id', rechnungController.updateRechnung);

// DELETE route to delete an existing Rechnung
router.delete('/deleteRechnung/:id', rechnungController.deleteRechnung);

module.exports = router;