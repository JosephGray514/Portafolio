const express = require('express');
const router = express.Router();

const insertProductController = require('../controllers/insertProductController');

router.get('/',insertProductController.select);
router.post('/insert',insertProductController.insert);

module.exports = router;