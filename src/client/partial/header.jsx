import React, { Component } from 'react';
import M from 'materialize-css';
import { Link } from 'react-router-dom';

const links = [
    <li><Link to="/cheatsheets">Cheatsheets</Link></li>,
    <li><Link to="/chat">Anonymous questions</Link></li>,
    <li><Link to='/faq'>Hackathon FAQ</Link></li>,
    <li><a href="https://github.com/hjfitz/bootcamp">Github</a></li>,
];

export default class Header extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    const { sidenav } = this;
    const instance = new M.Sidenav(sidenav);
    console.log(instance);
  }

  render() {
    return (
      <nav className='red darken-2'>
         <div class="nav-wrapper">
          <Link to='/' className="brand-logo center">IT Bootcamp</Link>
          <a href="#" data-target="mobile-demo" class="sidenav-trigger"><i class="material-icons">menu</i></a>
          <ul className="right hide-on-med-and-down">{links}</ul>
          <ul className="sidenav" id="mobile-demo" ref={nav => this.sidenav = nav}>{links}</ul>
        </div>
      </nav>
    );
  }
}