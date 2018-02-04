const { JSDOM } = require('jsdom');
const { transformSync } = require('@babel/core');
const log = require('../../logger')('cleanup');

const babelrc = `${__dirname}/.babelrc`;

exports.randomID = (len = 30) => {
  const chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  const randInt = () => Math.floor(Math.random() * 62);
  const randChar = () => chars[randInt()];
  return new Array(len).fill(0).map(randChar).join('');
};

exports.cleanDocument = (doc, filename) => {
  const dom = new JSDOM(doc);
  const head = dom.window.document.querySelector('head');
  /**
   * Remove any charset tags
   * Do this because we add one in views/uploaded
   * if the user has forgotten to add theirs
   */
  const meta = head.querySelectorAll('meta');
  [...meta].forEach(tag => {
    if (tag.outerHTML.match(/charset/gi)) {
      log('Removing <meta charset />');
      head.removeChild(tag);
    }
  });

  /**
   * No title? use the filename
   */
  if (!head.querySelector('title')) {
    log('Creating <title>');
    const title = dom.window.document.createElement('title');
    title.innerHTML = filename;
    head.appendChild(title);
  }

  /**
   * polyfill back to IE 11
   * Use local .babelrc
   * views/uploaded handles regeneratorRuntime
   * as well as fetch/promise polyfill
   */
  const scripts = head.querySelectorAll('script');
  log(`Polyfilling ${scripts.length} scripts`);
  scripts.forEach(script => {
    // use babel-core to run a polyfill over anything within <script>
    const { code } = transformSync(script.innerHTML, { extends: babelrc });
    script.innerHTML = code;
  });

  // pull out the body
  const body = dom.window.document.querySelector('body');
  // how we're to store our formatted data
  return {
    head: head.innerHTML,
    body: body.innerHTML,
  };
};
