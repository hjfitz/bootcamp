const express = require('express');
const contentful = require('./contentful');
const ajax = require('./ajax');

const router = express.Router();

router.use('/contentful', contentful);


// Lesson specific routes
router.use('/ajax', ajax);

router.get('/*', (req, res) => {
  res.json({
    message: 'Whoops! Maybe you meant /ajax?',
  });
});


module.exports = router;
