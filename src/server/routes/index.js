const express = require('express');
const contentful = require('./contentful');

const router = express.Router();

router.use('/contentful', contentful);

module.exports = router;
