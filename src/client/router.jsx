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
import 'materialize-css/dist/css/materialize'
import './styles/main';


// ensure that, on a new page, we scroll to the top
const onUpdate = () => window.scrollTo(0, 0);

// define our router
const app = (
  <Router onUpdate={onUpdate}>
    <Switch>
      <Layout>
        <Route exact path="/" component={Home} />
        <Route exact path="/chat" component={Chat} />
      </Layout>
    </Switch>
  </Router>
);

// get the entry point
const entry = document.getElementById('react');

// render
ReactDOM.render(app, entry);
