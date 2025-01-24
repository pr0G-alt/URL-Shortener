const express = require('express');
const linkController = require('./../controllers/linkController');
const router = express.Router();

router.get('/getAllLinks', linkController.getAllLinks);
router.get('/getLink/:shortCode', linkController.getLink);
router.get('/:shortCode', linkController.goToLink);
router.post('/shorten', linkController.shortenLink);
router.patch('/update/:shortCode', linkController.updateLink);

module.exports = router;
