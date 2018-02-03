/**
 * main deps
 */
const express = require('express');
const contentful = require('contentful');
const log = require('../logger')('contentful');

/**
 * route vars
 */
const contentfulApi = express.Router();
const client = contentful.createClient({
  space: process.env.CONTENTFUL_SPACE,
  accessToken: process.env.CONTENTFUL_DELIVERY,
});
log('Client connected');

/**
 * helper functions
 */
const getEntry = entry => async () => {
  log(`Attempting to get entry of type ${entry}`);
  const query = { include: 5, content_type: entry };
  const { items } = await client.getEntries(query);
  return items.filter(it => 'fields' in it);
};

const getWeeks = getEntry('week');

const sortByWeek = (wk1, wk2) => {
  if (wk1.weekName > wk2.weekName) {
    return 1;
  } else if (wk1.weekName < wk2.weekName) {
    return -1;
  }
  return 0;
};
/**
 * routes
 */
contentfulApi.get('/weeks', async (req, res) => {
  const weeks = await getWeeks();
  // remove un-necessary sys object for smaller network transport
  const parsedWeeks = weeks.map(week => week.fields).sort(sortByWeek);

  // format sessions nicely
  parsedWeeks.forEach(week => {
    // remove sys object from sessions
    week.lessons = week.sessions
      .filter(session => 'fields' in session)
      .map(session => session.fields);

    // :stophack:
    delete week.sessions;
  });

  // stringify and send data
  res.json(parsedWeeks);
});

module.exports = contentfulApi;
