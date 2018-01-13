import React, { Component } from 'react';
import marked from 'marked';

const placeholderSession = 'loading';

export default class SessionList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visibleSession: placeholderSession,
      sessionLists: '',
      visibleItems: '',
    };
    this.tabs = {};
    this.setSession = this.setSession.bind(this);
  }

  componentWillMount() {
    const sessionLists = this.props.sessions.map(session => {
      const { weekName: title, lessons } = session;
      const listItems = lessons.map(({
        title: lessontitle, subtitle, outcomes, startPoint, endPoint,
      }) => {
        const curLesson = (
          <li key={lessontitle}>
            <a href="#!" onClick={() => this.setSession(subtitle, outcomes, startPoint, endPoint)}>
              {subtitle}
            </a>
          </li>
        );
        return curLesson;
      });
      return (
        <li>
          <a href="#!" onClick={() => this.setList(listItems)} ref={item => this.tabs[item] = item}>
            {title}
          </a>
        </li>
      );
    });
    this.setState({ sessionLists });
  }

  setSession(subtitle, outcomes, startPoint, endPoint) {
    const parsed = { __html: marked(outcomes) };
    const newContent = (
      <div className="session">
        <h1>{subtitle}</h1>
        <div dangerouslySetInnerHTML={parsed} />
      </div>
    );
    this.setState({ visibleSession: newContent });
  }
  setList(listItems) {
    this.setState({ visibleItems: <ul>{listItems}</ul> });
  }

  render() {
    const { visibleSession, sessionLists, visibleItems } = this.state;
    return (
      <div className="session-list">
        <div className="main-list">
          <div className="list-tabs">
            <ul className="tabs">{sessionLists}</ul>
            <div className="items">
              {visibleItems}
            </div>
          </div>
        </div>
        <div className="session">
          {visibleSession}
        </div>
      </div>
    );
  }
}
