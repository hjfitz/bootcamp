/**
 * main deps
 */
const express = require('express');
const logger = require('../logger')('Ajax Lesson');

const router = express.Router();

let names = ['Sam Stenton'];
/**
 * routes
 */
router.get('/hello/:name', (req, res) => {
  logger(`Saying hello to ${req.params.name}`);
  res.json(`Hello ${req.params.name}`);
});

router.post('/names', (req, res) => {
  // Check they are sending a name param
  if (!('name' in req.body)) return res.send(400, 'You have not sent a name');
  logger(`Adding ${req.body.name} to the DB`);

  // Filter out if already exists
  names = names.filter(name => name !== req.body.name);
  names.push(req.body.name);

  return res.send(200, 'Added!');
});

router.get('/names', (req, res) => res.json(names));
router.delete('/names', (req, res) => {
  logger('Clearing database');
  names = [];
  return res.send(200, 'Cleared');
});

module.exports = router;
