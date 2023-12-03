const express = require('express');
const router = express.Router();

const multer = require('multer')

const insertProductController = require('../controllers/insertProductController');

const upload = multer({storage : multer.memoryStorage()})


router.get('/', insertProductController.select);
router.post('/insert', upload.array("file"), insertProductController.insert);

module.exports = router;