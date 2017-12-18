import React, { Component } from 'react';
import M from 'materialize-css';
import { Link } from 'react-router-dom';
import links from './navigation';

export default class Header extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    const { sidenav } = this;
    const instance = new M.Sidenav(sidenav);
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