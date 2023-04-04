const express = require('express');
const urlController = require('../controllers/urlController');
const router = express.Router();

router.route('/').post(urlController.createUrl); 
router.route('/url/:id').get(urlController.getUrl); 
router.route('/url/:id').put(urlController.updateUrl); 
router.route('/url/:id').delete(urlController.deleteUrl); 



module.exports = router;
