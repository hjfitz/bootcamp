/**
 * main imports
 */
import React from 'react';
import ReactDOM from 'react-dom';
import { 
  BrowserRouter as Router,
  Switch,
  Route } from 'react-router-dom';

/** 
* local imports
*/
import Layout from './layout';
import { Home, Chat } from './pages';

/**
 * CSS imports
 */
import 'materialize-css/dist/css/materialize.css'
import './style';

const onUpdate = () => window.scrollTo(0, 0);

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
