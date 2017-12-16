import React from 'react';
import { Header, Footer, List } from './partial';


export default ({ children }) => (
  <div id='react-app'>
    <Header />
      <h1>react works</h1>
      {children}
    <Footer />
  </div>
);