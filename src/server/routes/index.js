const express = require('express');
const contentful = require('./contentful');
const ajax = require('./ajax');

const router = express.Router();

router.use('/contentful', contentful);

<<<<<<< HEAD
// Lesson specific routes
router.use('/ajax', ajax);

=======
>>>>>>> master
module.exports = router;
