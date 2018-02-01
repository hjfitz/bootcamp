/**
 * main deps
 */
const express = require('express');
const logger = require('../logger')('Ajax Lesson');

const router = express.Router();

let names = ['John Doe'];
/**
 * routes
 */
router.post('/hello', (req, res) => {
  logger('Saying hello');

  return res.json(req.body);
});

router.get('/hello', (req, res) => {
  logger('Getting POSTED');
  res.json(':) Hello :)');
});

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

// fall-through for errors
router.get('/*', (req, res) => {
  res.json({
    message: 'Whoops! Maybe you meant /names or /hello??',
  });
});

module.exports = router;
