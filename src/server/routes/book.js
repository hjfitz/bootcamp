const express = require('express');

const book = express.Router();

book.get('/task', (req, res) => {
  res.json([
    { name: 'Task 1', task: },
    { name: 'Task 1', task: },
     
  ])
})


module.exports = book;
