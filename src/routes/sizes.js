const express = require('express');
const router = express.Router();

const sizesController = require('../controllers/sizesController');

router.get('/',sizesController.select);
router.post('/insert',sizesController.insert);

module.exports = router;