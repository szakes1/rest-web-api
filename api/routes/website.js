const express = require('express');
const router = express.Router();
const websiteController = require('../controllers/website');

router.get('/', websiteController);

module.exports = router;