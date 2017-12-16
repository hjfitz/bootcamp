import React, { Component } from 'react';
import $ from 'jquery';
import M from 'materialize-css';
import { ajax, genList } from '../util';
import { Hero } from '../partial';

export default class Home extends Component {
  constructor(props) {
    super(props);
    this.state = { children: '' };
    this.instances = { collapsibles: [] };
  }

  /** 
   * get data from the server 
   */
  async componentWillMount() {
    const sessions = await ajax.get('/api/contentful/weeks');
    const children = genList(sessions);
    this.setState({ children });
  }

  /**
   * wait until we've rendered and then add fancy stuff
   */
  componentDidUpdate() {
    const collapsibles = document.querySelectorAll('.collapsible');
    collapsibles.forEach(collap => {
      this.instances.collapsibles.push(new M.Collapsible(collap));
    });

    const spoilerButtons = document.querySelectorAll('.spoiler-button');
    spoilerButtons.forEach(button => {
      button.addEventListener('click', ({ target }) => {
        const { reveals } = target.dataset;
        const spoiler = document.getElementById(reveals);
        spoiler.classList.toggle('spoilt');
      });
    });
  }

  render() {
    return (
      <div>
        <Hero />
        {this.state.children}
      </div>
    );
  }
  
}