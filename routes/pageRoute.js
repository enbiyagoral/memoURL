const express = require('express');
const pageController = require('../controllers/pageController');
const router = express.Router();

router.route('/').get(pageController.getIndexPage);
router.route('/url').get(pageController.getUrlPage)
module.exports = router;
