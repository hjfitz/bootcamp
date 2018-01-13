import React from 'react';
import links from './navigation';

export default () => (
  <footer className="page-footer  blue-grey darken-4">
    <div className="footer-copyright">
      <div className="container">
        © {(new Date()).getFullYear()} Eli Lilly and Company
        <a className="grey-text text-lighten-4 right" href="#!" />
      </div>
    </div>
  </footer>
);
