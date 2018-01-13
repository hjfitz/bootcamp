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
    const startUrl = window.location.protocol + startFile;
    const { url: endFile } = endPoint.fields.file;
    const endUrl = window.location.protocol + endFile;
    const parsed = { __html: marked(outcomes) };
    const visibleSession = [
      <h1>{subtitle}</h1>,
      <div dangerouslySetInnerHTML={parsed} />,
    ];
    const files = {
      start: (
        <a href={startUrl} download>
          <div className="download-item">
            <i className="material-icons">file_download</i>
            <p>Starting file</p>
          </div>
        </a>
      ),
      end: (
        <a href={endUrl} download>
          <div className="download-item">
            <i className="material-icons">file_download</i>
            <p>Completed file</p>
          </div>
        </a>
      ),
    };

    this.setState({ visibleSession, files });
  }
  setList(listItems, ev) {
    const elems = document.getElementsByClassName('tab');
    Array.from(elems).forEach(elem => elem.classList.remove('active'));
    ev.target.parentElement.classList.add('active');
    this.setState({ visibleItems: <ul>{listItems}</ul> });
  }

  render() {
    const {
      visibleSession, sessionLists, visibleItems, files,
    } = this.state;
    let downloads;
    if (files) {
      downloads = (
        <div className="files">
          <div className="start">
            {files.start}
          </div>
          <div className="end">
            {files.end}
          </div>
        </div>
      );
    }
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
          {downloads}
        </div>
      </div>
    );
  }
}
