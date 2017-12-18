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
  }

  updateQuestions(questions) {
    const parsed = questions.map(({question}) => (
      <li key={new Date() + question} className='collection-item'>{question}</li>
    ));

    const allQuestions = this.state.questions;
    allQuestions.push(...parsed);
    this.setState({ questions: allQuestions });

  }

  sendQuestion({ key }) {
    if (key === undefined || key === 'Enter') {
      const question = this.textArea.value;
      this.socket.emit('question', { question });
      this.textArea.value = '';
    }
  }

  render() {
    return (
      <div>
        <div className="row">
          <h1>Anonymous Chat</h1>
        </div>
        <div className="row">
          <ul className="collection" id='questions'>
            {this.state.questions}
          </ul>
        </div>
        <div className="row">
          <form className="col s12">
            <div className="row">
              <div className="input-field col s12">
                <textarea 
                  id="textarea" 
                  className="materialize-textarea" 
                  ref={text => this.textArea = text} 
                  onKeyPress={this.sendQuestion}
                />
                <label htmlFor="textarea">Question</label>
              </div>
            </div>
          </form>
        </div>
        <a onClick={this.sendQuestion} className="waves-effect waves-light btn red darken-3" id='submit'>Send</a>
      </div>
    )
  }
}