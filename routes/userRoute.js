const express = require('express');
const authController = require('../controllers/authController');
const redirectMiddleware = require('../middlewares/redirectMiddleware');
const router = express.Router();

router.route('/login').post(authController.loginUser);
router.route('/logout').get(authController.logoutUser);
router.route('/dashboard').get(redirectMiddleware,authController.getDashboardPage);
router.route('/signup').post(authController.createUser);
module.exports = router;
