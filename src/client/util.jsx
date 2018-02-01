import React from 'react';
import { List, ListItem } from './partial/list';

export const ajax = {
  get: endpoint => fetch(endpoint).then(resp => resp.json()),
};

export const genItems = lessons => lessons.map(({
  title, subtitle, outcomes, spoiler, day, presenter, lang,
}) => (
  <ListItem
    key={title}
    title={title}
    subtitle={subtitle}
    outcomes={outcomes}
    language={lang}
    day={day}
    spoiler={spoiler}
    presenter={presenter}
  />
));

export const genList = sessions => sessions.map(({ weekName, lessons }) => (
  <List key={weekName} header={weekName}>{genItems(lessons)}</List>
));
