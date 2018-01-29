import React, { Component } from 'react';
import openSocket from 'socket.io-client';

export default class Chat extends Component {
  constructor(props) {
    super(props);
    this.state = { questions: [] };
    this.updateQuestions = this.updateQuestions.bind(this);
    this.sendQuestion = this.sendQuestion.bind(this);
    this.socket = openSocket(window.location.origin);
    this.socket.on('question', this.updateQuestions);
    this.socket.on('cleanup', () => {
      this.setState({ questions: [] });
      this.updateQuestions([]);
    });
  }

  componentWillUnmount() {
    this.socket.disconnect();
  }

  updateQuestions(questions) {
    const parsed = questions.map(({ question }) => (
      <li key={this.state.questions.length || -1} className="collection-item">{question}</li>
    ));

    const allQuestions = this.state.questions;
    allQuestions.push(...parsed);
    this.setState({ questions: allQuestions });
  }

  sendQuestion({ key }) {
    const { textArea } = this;
    if (key === undefined || key === 'Enter') {
      const question = textArea.value.trim();
      if (question !== '') {
        this.socket.emit('question', { question });
      }
      textArea.value = '';
    }
    return false;
  }

  render() {
    return (
      <div>
        <div className="row">
          <h1>Anonymous Chat</h1>
        </div>
        <div className="row">
          <ul className="collection" id="questions">
            {this.state.questions}
          </ul>
        </div>
        <div className="row">
          <form className="col s12">
            <div className="row">
              <div className="input-field col s12">
                <label htmlFor="textarea">Question</label>
                <textarea
                  id="textarea"
                  className="materialize-textarea"
                  ref={text => this.textArea = text}
                  onKeyUp={this.sendQuestion}
                />
              </div>
            </div>
          </form>
        </div>
        <a href="#!" onClick={this.sendQuestion} className="waves-effect waves-light btn chat-button" id="submit">Send</a>
      </div>
    );
  }
}
