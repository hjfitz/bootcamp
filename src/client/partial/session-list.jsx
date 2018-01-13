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
        <li className="tab">
          <a href="#!" onClick={ev => this.setList(listItems, ev)}>
            {title}
          </a>
        </li>
      );
    });
    this.setState({ sessionLists });
  }

  setSession(subtitle, outcomes, startPoint, endPoint) {
    const { url: startFile } = startPoint.fields.file;
    const { url: endFile } = endPoint.fields.file;
    const parsed = { __html: marked(outcomes) };
    const newContent = [
      <h1>{subtitle}</h1>,
      <div dangerouslySetInnerHTML={parsed} />,
    ];
    this.setState({ visibleSession: newContent });
  }
  setList(listItems, ev) {
    const elems = document.getElementsByClassName('tab');
    Array.from(elems).forEach(elem => elem.classList.remove('active'));
    ev.target.parentElement.classList.add('active');
    this.setState({ visibleItems: <ul>{listItems}</ul> });
  }

  render() {
    const { visibleSession, sessionLists, visibleItems } = this.state;
    return (
      <div className="session-list card">
        <div className="main-list">
          <div className="list-tabs">
            <ul className="tabs" ref={tabs => this.tabs = tabs}>{sessionLists}</ul>
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
