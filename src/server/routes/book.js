const express = require('express');
const logger = require('../logger')('API Session 2');

Array.prototype.random = function random() {
  const { length } = this;
  const rand = Math.floor(Math.random() * length);
  return this[rand];
};

const generateNonce = (len = 30) => {
  const chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  const randInt = () => Math.floor(Math.random() * 62);
  const randChar = () => chars[randInt()];
  // have to use array#fill because we can't map over undefined pointers
  return new Array(len).fill(0).map(randChar).join('');
};

const key = generateNonce();
const fame = [];
const prefixes = [
  'a good',
  'a badman',
  'a cirrus-tier',
  'an amazing',
  'an okay i guess',
  'a hardcore',
  'a top tier badass super special awesome',
  'a BEAN BEARDED',
  'a Sam tier',
  'a (northern) Sam tier',
];

// setInterval(() => {
// key = generateNonce();
// }, 5000);

const book = express.Router();

book.get('/tasks', (req, res) => {
  res.json({
    tasks: [
      { name: 'Task 1', task: 'Make a request to /api/ajax2/YOURNAMEHERE, see it appear on the board and log the output', difficulty: 'Easy' },
      { name: 'Task 2', task: 'Create a function `printEndpoint` that takes one parameter, uses it as the argument for fetch and logs the output', difficulty: 'Medium' },
      { name: 'Task 3', task: 'Use the aforementioned function and access /api/ajax2/hall-of-fame to see who is in the hall of fame', difficulty: 'Easy' },
      { name: 'Task 4', task: 'Make another function `getEasyTasks` to access /api/ajax2/tasks. Make it so that you can hit', difficulty: 'Medium' },
      { name: 'Task 5', task: 'Make a function that gets the secret key from /key/yourname', difficulty: 'Medium' },
      { name: 'Task 6', task: 'Make a request to get a key, via /api/ajax2/YOURNAMEGOESHERE, and when you get the key, make a POST request with your name and the key in the body', difficulty: 'Advanced' },
    ],
    winners: fame.length === 0 ? 'No one yet!' : fame,
  });
});

// task 1
book.get('/:name', (req, res) => {
  const prefix = prefixes.random();
  logger(`${req.params.name} is ${prefix} coder!`);
  res.json(`You're ${prefix} coder`);
});

// task 3
book.get('/hall-of-fame', (req, res) => {
  logger(`The following are in the hall of fame currently: ${fame.join('\n -')}`);
  res.json(fame);
});

// task 5
book.get('/key/:name', (req, res) => {
  logger(`${req.params.name} got the secret key!`);
  res.json(key);
});

// task 6
book.post('/hall-of-fame', (req, res) => {
  if (!('key' in req.body)) {
    return res.json({ status: 'error', message: 'Key not attached!' });
  }
  if (!('name' in req.body)) {
    return res.json({ status: 'error', message: 'You forgot your name!' });
  }
  const { key: sentKey, name } = req.body;
  if (key !== sentKey) {
    return res.json({ statys: 'error', message: 'Invalid key!' });
  }
  if (!fame.includes(name)) {
    fame.push(name);
    logger(`${name} made it in to the hall!`);
    return res.json({ status: 'success!', message: 'Welcome to the hall!' });
  }
  return res.json({ status: 'success', message: `Welcome back, ${name}` });
});

module.exports = book;
