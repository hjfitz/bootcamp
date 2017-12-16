import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import Layout from './layout';

const onUpdate = () => window.scrollTo(0, 0);

const Home = '';
const Chat = '';

const app = (
  <Router onUpdate={onUpdate}>
    <Switch>
      <Layout>
        <Route path="/" component={Home} />
        <Route path="/chat" component={Chat} />
      </Layout>
    </Switch>
  </Router>
);

const entry = document.getElementById('react');

ReactDOM.render(app, entry);
