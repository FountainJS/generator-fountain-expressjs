'use strict';

var express = require('express');
var controller = require('./example.controller');

var router = express.Router(); // eslint-disable-line new-cap

router.get('/', controller.index);
router.get('/:id', controller.show);

module.exports = router;
