import React from 'react';
import { Link } from 'react-router-dom';

export default [
  <li key="home"><Link href="#!" to="/">Home</Link></li>,
  <li key="anon"><Link href="#!" to="/chat">Questions</Link></li>,
  <li key="faq"><Link href="#!" to="/faq">FAQ</Link></li>,
  <li key="upload"><Link href="#!" to="/upload">Upload</Link></li>,
  <li key="gh"><a href="https://github.com/hjfitz/bootcamp">Github</a></li>,
];
