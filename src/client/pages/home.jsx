import React, { Component } from 'react';
import $ from 'jquery';
import M from 'materialize-css';
import { ajax, genList } from '../util';
import { Hero, Loading } from '../partial';

export default class Home extends Component {
  constructor(props) {
    super(props);
    this.state = { children: <Loading /> };
    this.instances = { collapsibles: [] };
    this.listenersSet = false;
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
    if (!this.listenersSet) {
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
      this.listenersSet = true;
    }
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