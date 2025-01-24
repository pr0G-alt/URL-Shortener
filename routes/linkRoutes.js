const express = require('express');
const linkController = require('./../controllers/linkController');
const router = express.Router();

router.get('/getAllLinks', linkController.getAllLinks);

module.exports = router;
