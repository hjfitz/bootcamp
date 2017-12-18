import React from 'react';
import links from './navigation';

export default () => (
  <footer className="page-footer  red darken-3">
    <div className="container">
      <div className="row">
        <div className="col l6 s12">
          <h5 className="white-text">IT Bootcamp</h5>
          <p className="grey-text text-lighten-4">The IT Bootcamp, produced by Harry and Phil of Cirrus Labs</p>
        </div>
        <div className="col l4 offset-l2 s12">
          <h5 className="white-text">Links</h5>
          <ul>{links}</ul>
        </div>
      </div>
    </div>
    <div className="footer-copyright">
      <div className="container">
        © {(new Date()).getFullYear()} Eli Lilly and Company
        <a className="grey-text text-lighten-4 right" href="#!"></a>
      </div>
    </div>
  </footer>
);