import React from 'react';

export default () => (
  <div>
    <h1>IT Bootcamp</h1>
    <p>Welcome to the bootcamp. This page aims to give an oversight in to the sort of content we aim to provide, as well as a schedule on what's to come</p>
    <div className="row">
      <div className="col s12 m6">
        <div className="card">
          <div className="card-content white-text">
            <h2 className="link-card-title red-text text-darken-3">Quick Links</h2>
            <div className='row'>
              <a className="waves-effect waves-light btn red darken-3">HTML Cheatsheet</a>
            </div>
            <div className="row">
              <a className="waves-effect waves-light btn red darken-3">CSS Cheatsheet</a>
            </div>
            <div className="row">
              <a className="waves-effect waves-light btn red darken-3">JavaScript Cheatsheet</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
);
