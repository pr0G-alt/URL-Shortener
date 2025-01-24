const express = require('express');
const linkController = require('./../controllers/linkController');
const router = express.Router();

router.get('/getAllLinks', linkController.getAllLinks);
router.get('/getLink/:shortCode', linkController.getLink);
router.post('/shorten', linkController.shortenLink);
router
  .route('/:shortCode')
  .get(linkController.goToLink)
  .patch(linkController.updateLink)
  .delete(linkController.deleteLink);

module.exports = router;
