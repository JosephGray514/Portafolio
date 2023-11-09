const express = require('express');
const router = express.Router();

const catalogueController = require('../controllers/catalogueController');

router.get('/:id', catalogueController.select);

module.exports = router;