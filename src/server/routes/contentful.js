/**
 * main deps
 */
const express = require('express');
const contentful = require('contentful');

/**
 * route vars
 */
const contentfulApi = express.Router();
const client = contentful.createClient({
  space: process.env.CONTENTFUL_SPACE,
  accessToken: process.env.CONTENTFUL_DELIVERY,
});

/**
 * helper functions
 */
const getEntry = entry => async () => {
  const query = { include: 5, content_type: entry };
  const { items } = await client.getEntries(query);
  return items.filter(it => 'fields' in it);
};

const getWeeks = getEntry('week');
const getSessions = getEntry('session');

/**
 * routes
 */
contentfulApi.get('/weeks', async (req, res) => {
  const weeks = await getWeeks();
  const parsedWeeks = weeks.map(week => week.fields)
  parsedWeeks.forEach(week => {
    // hacky removal of a getter
    week.lessons = week.sessions
      .filter(session => 'fields' in session)
      .map(session => session.fields);
    delete week.sessions;
  });
  res.json(parsedWeeks);
});

module.exports = contentfulApi;
