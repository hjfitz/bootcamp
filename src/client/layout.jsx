import React from 'react';
import { Header, Footer, List } from './partial';

export default ({ children }) => (
  <div id='react-app'>
    <Header />
      <main className="container">
        {children}
      </main>
    <Footer />
  </div>
);