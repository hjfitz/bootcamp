import React, { Component } from 'react';
import axios from 'axios';

export default class Upload extends Component {
  constructor(props) {
    super(props);
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
    }).then(data => {
      console.log(data.data.filename);
    });
  }

  render() {
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
        </div>
      </div>
    );
  }
}
