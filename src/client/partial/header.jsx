import React, { Component } from 'react';
import M from 'materialize-css';
import { Link } from 'react-router-dom';
import links from './navigation';

export default class Header extends Component {
  constructor(props) {
    super(props);
    this.state = { hoverBar: false };
    this.scrolledPast = this.scrolledPast.bind(this);
  }

  componentDidMount() {
    const { sidenav } = this;
    const instance = new M.Sidenav(sidenav);
    window.addEventListener('scroll', this.scrolledPast);
  }

  /**
   * We can be sure that this.after is mounted 
   * as this will only be invoked after componentDidMount()
   * 
   * Setting the state with each scroll seems bad, 
   * but a reflow only occurs when state differs
   */
  scrolledPast() {
    const { top } = this.after.getBoundingClientRect();
    const { height } = this.nav.getBoundingClientRect();
    if (top <= 0) {
      this.setState({ hoverBar: true });
    } 
    if ( window.scrollY < height) {
      this.setState({ hoverBar: false });
    }
  }

  render() {
    const className = this.state.hoverBar ? 'after hover' : 'after';
    return (
      <nav ref={nav => this.nav = nav}>
        <Link to='/' className="logo">IT Bootcamp</Link>
        <a href="#" data-target="mobile-demo" className="sidenav-trigger"><i className="material-icons">menu</i></a>
        <ul className="right hide-on-med-and-down">{links}</ul>
        <ul className="sidenav" id="mobile-demo" ref={nav => this.sidenav = nav}>{links}</ul>
        <div className={className} ref={after => this.after = after} />
      </nav>
    );
  }
}