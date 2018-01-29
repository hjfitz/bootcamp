const express = require('express');
const contentful = require('./contentful');
const ajax = require('./ajax');

const router = express.Router();

router.use('/contentful', contentful);

// Lesson specific routes
router.use('/ajax', ajax);

module.exports = router;
