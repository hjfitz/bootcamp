const express = require('express');
const multer = require('multer');
const Redis = require('redis-utils-json');

const { randomID, cleanDocument } = require('./util');
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
    return res.json({ status: 'error', message: `Expected HTML file, given ${mimetype}` });
  }
  // generate filename + keys for redis
  const id = randomID(15);
  const filename = `${id}.${name}`;
  const key = `file:${filename}`;
  // extract head/body info using JSDOM
  // TODO: add polyfill
  const contents = buffer.toString();
  log('Attempting to format file...');
  const formattedFile = cleanDocument(contents, filename);
  // store it in redis!
  log(`Done! Located at /api/files/${filename}`);
  await client.setKey(key, formattedFile);
  return res.json({ status: 'success', filename });
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
