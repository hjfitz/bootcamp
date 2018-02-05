import React, { Component } from 'react';
import axios from 'axios';

export default class Upload extends Component {
  constructor(props) {
    super(props);
    this.state = { status: '' };
    this.uploadFile = this.uploadFile.bind(this);
  }

  uploadFile() {
    const file = this.up.files[0];
    const formData = new FormData();
    formData.append('index', file);
    axios.post('/api/files', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
      .then(data => data.data)
      .then(data => {
        if (data.status === 'success') {
          const { filename } = data;
          this.setState({ status: 'uploaded', filename, error: '' });
        } else {
          const { message } = data;
          this.setState({ status: 'error', error: message, filename: '' });
        }
      });
  }

  render() {
    let message = '';
    if (this.state.status === 'uploaded') {
      message = (
        <div>
          <h2>Your file has been uploaded!</h2>
          <h3>Click <a href={`/api/files/${this.state.filename}`}>here</a> to view</h3>
        </div>
      );
    } else if (this.state.status === 'error') {
      message = (
        <div>
          <h2>Your file was not uploaded</h2>
          <h3>Reason: {this.state.error}</h3>
        </div>
      );
    }
    return (
      <div className="card session-list">
        <div className="card-content upload-area">
          <span className="card-title">Upload a Webpage!</span>
          <form action="#">
            <div className="file-field input-field">
              <div className="btn upload-button">
                <span>File</span>
                <input type="file" ref={up => this.up = up} />
              </div>
              <div className="file-path-wrapper">
                <input className="file-path validate" type="text" />
              </div>
            </div>
            <a href="#!" onClick={this.uploadFile} className="waves-effect waves-light btn chat-button" id="submit">Upload</a>
          </form>
          {message}
        </div>
      </div>
    );
  }
}
