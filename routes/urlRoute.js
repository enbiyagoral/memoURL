const express = require('express');
const urlController = require('../controllers/urlController');
const router = express.Router();

router.route('/').post(urlController.createUrl);
router.route('/:id').get(urlController.getUrl);
router.route('/:id').put(urlController.updateUrl);
router.route('/:id').delete(urlController.deleteUrl);

module.exports = router;
