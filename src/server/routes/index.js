const express = require('express');
const contentful = require('./contentful');
const ajax = require('./ajax');
const ajax2 = require('./ajax2');
const files = require('./files');
const social = require('./social');

const router = express.Router();

router.use('/contentful', contentful);


// Lesson specific routes
router.use('/ajax', ajax);
router.use('/ajax2', ajax2);
router.use('/posts', social);

router.use('/files', files);

router.get('/*', (req, res) => {
  res.json({
    message: 'Whoops! Maybe you meant one of these routes?',
    routes: [
      '/ajax',
      '/ajax2',
      '/files',
      '/posts',
    ],
  });
});


module.exports = router;
