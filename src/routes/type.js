const express = require('express');
const router = express.Router();

const typeController = require('../controllers/typeController');

router.get('/',typeController.select);
router.post('/insert',typeController.insert);

module.exports = router;