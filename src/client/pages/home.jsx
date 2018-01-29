import React, { Component } from 'react';
import { ajax } from '../util';
import { Loading, SessionList } from '../partial';

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
    // const children = genList(sessions);
    const children = <SessionList sessions={sessions} />;
    this.setState({ children });
  }

  render() {
    return (
      <div>
        {this.state.children}
      </div>
    );
  }
}
