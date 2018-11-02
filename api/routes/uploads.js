const express = require('express');
const router = express.Router();
const uploadsController = require('../controllers/uploads');
const checkAuth = require('../middleware/checkAuth');

router.get('/:dllId', checkAuth, uploadsController);

module.exports = router;