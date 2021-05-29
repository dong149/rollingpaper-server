var express = require('express');
var router = express.Router();

router.use('/rolling', require('./rolling'));
router.use('/sticker', require('./sticker'));
router.use('/count', require('./count'));

module.exports = router;
