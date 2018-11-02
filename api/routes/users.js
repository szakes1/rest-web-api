const express = require('express');
const router = express.Router();
const checkAuth = require('../middleware/checkAuth');
const usersController = require('../controllers/users');


router.post('/signup', usersController.user_signup);
router.post('/login', usersController.user_login);

router.delete('/:userId', checkAuth, usersController.user_delete);

module.exports = router;

