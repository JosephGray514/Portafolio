const express = require('express');
const router = express.Router();

const multer = require('multer')

const insertCatalogueController = require('../controllers/insertCatalogueController');

const uploads = multer({storage : multer.memoryStorage()})


router.get('/', insertCatalogueController.select);
router.post('/insert', uploads.single("file"), insertCatalogueController.insert);

module.exports = router;