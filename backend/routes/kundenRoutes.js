const express = require('express');
const router = express.Router();
const kundenController = require('../controllers/kundenController');
const authMiddleware = require('../middleware/authMiddleware');

router.post('/createKunden', authMiddleware.isLoggedIn, kundenController.createKunden);
router.get('/getAllKunden', authMiddleware.isLoggedIn, kundenController.getAllKunden);
router.get('/getKundenById/:id', authMiddleware.isLoggedIn, kundenController.getKundenById);
router.put('/updateKunden/:id', authMiddleware.isLoggedIn, kundenController.updateKunden);
router.delete('/deleteKunden/:id', authMiddleware.isLoggedIn, kundenController.deleteKunden);

module.exports = router;
