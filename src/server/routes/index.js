const express = require('express');
const contentful = require('./contentful');
const ajax = require('./ajax');
const ajax2 = require('./book');
const files = require('./files');

const router = express.Router();

router.use('/contentful', contentful);


// Lesson specific routes
router.use('/ajax', ajax);

router.use('/ajax2', ajax2);

router.use('/files', files);

router.get('/*', (req, res) => {
  res.json({
    message: 'Whoops! Maybe you meant /ajax?',
  });
});


module.exports = router;
