const express = require('express');
const multer = require('multer');
const Redis = require('redis-utils-json');
const { JSDOM } = require('jsdom');
const { transformSync } = require('@babel/core');
const { randomID } = require('./util');
const log = require('../../logger')('upload');

const client = new Redis(process.env.REDIS_URL);
log('Redis client loaded');

const upload = multer();

const fileRouter = express.Router();

fileRouter.post('/', upload.single('index'), async (req, res) => {
  const { file } = req;
  const { originalname: name, buffer, mimetype } = file;
  log(`Recieved file ${name}`);
  if (mimetype !== 'text/html') {
    log('Error with file');
    return res.json({ status: 'error', message: 'Expected HTML file' });
  }
  // generate filename + keys for redis
  const id = randomID(15);
  const filename = `${id}.${name}`;
  const key = `file:${filename}`;
  // extract head/body info using JSDOM
  // TODO: add polyfill
  const contents = buffer.toString();
  const dom = new JSDOM(contents);
  const head = dom.window.document.querySelector('head');
  // check title and meta tags
  const hasTitle = !!head.querySelector('title');
  const meta = head.querySelectorAll('meta');
  [...meta].forEach(tag => {
    if (tag.outerHTML.match(/charset/gi)) {
      log('Removing <meta charset />');
      head.removeChild(tag);
    }
  });

  // if no title, append one
  if (!hasTitle) {
    log('Creating title');
    const title = dom.window.document.createElement('title');
    title.innerHTML = filename;
    head.appendChild(title);
  }

  // handle script polyfilling
  const scripts = head.querySelectorAll('script');
  scripts.forEach(script => {
    const { innerHTML: code } = script;
    const { code: polyfilled } = transformSync(code, { extends: `${__dirname}/.babelrc` });
    head.removeChild(script);
    const newScript = dom.window.document.createElement('script');
    newScript.textContent = polyfilled;
    head.appendChild(newScript);
  });

  // pull out the body
  const body = dom.window.document.querySelector('body');
  // how we're to store our formatted data
  const formattedFile = {
    head: head.innerHTML,
    body: body.innerHTML,
  };
  // store it in redis!
  try {
    await client.setKey(key, formattedFile);
    res.json({ status: 'success', filename });
  } catch (err) {
    res.json({ status: 'error', message: err });
  }
});

fileRouter.get('/:filename', async (req, res) => {
  const { filename } = req.params;
  const { found, data } = await client.getByKey(`file:${filename}`);
  if (!found) {
    return res.json({ status: 'error', message: 'file not found' });
  }
  return res.render('uploaded', data);
});

module.exports = fileRouter;
