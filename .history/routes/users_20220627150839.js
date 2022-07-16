var express = require('express');
const { authentication } = require('../middlwares/authentication');
var router = express.Router();

/* GET users listing. */
router.get('/profile',authentication, function(req, res, next) {
  res.send('respond with a resource');
});

module.exports = router;
