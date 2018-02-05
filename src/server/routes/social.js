const express = require('express');
const log = require('../logger')('social');
const { randomID } = require('./files/util');

const social = express.Router();

const posts = [
  { id: randomID(10), username: 'Harry', post: 'Welcome to the bootcamp!' },
];

social.get('/all/:username', (req, res) => {
  log('Serving all posts');
  res.json(posts);
});

social.post('/', (req, res) => {
  log('attempting to serve post');
  if (!('post' in req.body)) {
    log('no posts in body!');
    return res.json({ status: 'error', message: 'no post found!' });
  }
  if (!('username' in req.body)) {
    log('no username found!');
    return res.json({ status: 'error', message: 'no username found!' });
  }
  const id = randomID(10);
  const { post, username } = req.body;
  const newPost = { id, post, username };
  // check we're not duplicating any posts
  const matches = posts.filter(ps => ps.post === post);
  if (matches.length === 0) {
    posts.unshift(newPost);
    log(`Serving new ${id} by ${username}`);
    return res.json({ newPost });
  }
  log(`Serving old ${id} by ${username}`);
  return res.json(newPost);
});

social.get('/:postid', (req, res) => {
  const { postid } = req.params;
  const [post] = posts.filter(({ id }) => id === postid);
  if (!post) {
    res.json({ status: 'error', message: 'no post found!' });
  } else {
    log(`Serving ${post.id} by ${post.username}`);
    res.json(post);
  }
});

module.exports = social;
