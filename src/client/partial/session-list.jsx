import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import marked from 'marked';

const placeholderSession = (
  <div className="session">
    <h1>Welcome to the IT Bootcamp!</h1>
    <p>Here, you will find information and start files relating to the bootcamp sessions.</p>
    <p>Below are some additional useful tools:</p>
    <ul>
      <li><Link href="#!" to="/chat">Anonymous chatroom</Link></li>
      <li><a href="https://codepen.io/pen/?editors=1100#0">Codepen</a></li>
    </ul>
  </div>
);

export default class SessionList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visibleSession: placeholderSession,
      sessionLists: '',
      visibleItems: '',
    };
    this.setSession = this.setSession.bind(this);
    this.listSets = [];
  }

  /**
   * Before component mounts, prepare the tabs and the sessions within
   */
  componentWillMount() {
    const sessionLists = this.props.sessions.map(session => {
      const { weekName: title, lessons } = session;
      // generate a listItems for each session
      const listItems = lessons.map(lesson => {
        const { subtitle, outcomes, startPoint, endPoint } = lesson;
        // onClick, set new state
        const onClick = () => this.setSession(subtitle, outcomes, startPoint, endPoint);
        // each item should be in a list
        return (
          <li key={subtitle}>
            <a href="#!" onClick={onClick}>
              {subtitle}
            </a>
          </li>
        );
      });
      const onClick = ev => this.setList(listItems, ev);
      this.listSets.push(onClick);
      return (
        <li className="tab">
          <a href="#!" onClick={onClick}>
            {title}
          </a>
        </li>
      );
    });
    this.setState({ sessionLists });
  }

  componentDidMount() {
    this.listSets[0]();
  }

  /**
   * Sets the session in the righthand box
   * @param {string} subtitle title for each session
   * @param {string} outcomes outcomes of each session (parsed from md)
   * @param {object} startPoint start file
   * @param {object} endPoint end file
   */
  setSession(subtitle, outcomes, startPoint, endPoint) {
    // generate links to download files
    
    // parse some markdown
    const parsed = { __html: marked(outcomes) };
    const visibleSession = [
      <h1>{subtitle}</h1>,
      <div dangerouslySetInnerHTML={parsed} />,
    ];
    
    let startUrl;
    let endUrl;
    if (startPoint) {
      const { url: startFile } = startPoint.fields.file;
      startUrl = window.location.protocol + startFile;
      const { url: endFile } = endPoint.fields.file;
      endUrl = window.location.protocol + endFile;
      
      // generate some file download links
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
      return this.setState({ visibleSession, files });
    }
    return this.setState({ visibleSession });
  }

  /**
   * Remove all active header classes and add to clicked header
   * @param {List} listItems List of list item
   * @param {Event} ev Event from click
   */
  setList(listItems, ev) {
    if (ev) {
      const elems = document.getElementsByClassName('tab');
      Array.from(elems).forEach(elem => elem.classList.remove('active'));
      ev.target.parentElement.classList.add('active');
    }
    this.setState({ visibleItems: <ul>{listItems}</ul> });
  }

  render() {
    const { visibleSession, sessionLists, visibleItems, files } = this.state;
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
            <ul className="tabs">{sessionLists}</ul>
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
