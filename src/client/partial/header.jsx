import React from 'react';
import { Link } from 'react-router-dom';

export default () => (
  <nav className='red darken-2'>
    <div className="nav-wrapper">
      <Link to='/' className="brand-logo center">IT Bootcamp</Link>
      <ul id="nav-mobile" className="right hide-on-med-and-down">
        <li><a href="https://github.com/hjfitz/bootcamp">Github</a></li>
        <li><a href="cheatsheets/index.html">Cheatsheets</a></li>
        <li><Link to="/chat">Anonymous questions</Link></li>
        <li><Link to='/faq'>Hackathon FAQ</Link></li>
      </ul>
    </div>
  </nav>
)