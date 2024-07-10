const express = require('express');
const router = express.Router();
const leistungController = require('../controllers/leistungenController');
const authMiddleware = require('../middleware/authMiddleware');

router.post('/createLeistung', authMiddleware.isLoggedIn, leistungController.createLeistung);
router.get('/getAllLeistungen', authMiddleware.isLoggedIn, leistungController.getAllLeistungen);
router.get('/getLeistungById/:id', authMiddleware.isLoggedIn, leistungController.getLeistungById);
router.put('/updateLeistung/:id', authMiddleware.isLoggedIn, leistungController.updateLeistung);
router.delete('/deleteLeistung/:id', authMiddleware.isLoggedIn, leistungController.deleteLeistung);

module.exports = router;
