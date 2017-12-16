import React from 'react';
import { List, ListItem } from './partial/list';

const self = (module.exports = {
  ajax: {
    get: endpoint => fetch(endpoint).then(resp => resp.json()),
  },
  genItems: lessons => lessons.map(({ title, subtitle, outcomes, spoiler, day, presenter }) => (
    <ListItem 
      key={title}
      title={title}
      subtitle={subtitle}
      outcomes={outcomes}
      day={day}
      spoiler={spoiler}
      presenter={presenter}
    />
  )),
  genList: sessions => sessions.map(({ weekName, lessons }) => (
      <List key={weekName} header={weekName} children={self.genItems(lessons)} />
  )),
});