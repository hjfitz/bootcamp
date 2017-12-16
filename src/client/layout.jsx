import React from 'react';
import { Header, Footer, List, Hero } from './partial';

export default ({ children }) => (
  <div id='react-app'>
    <Header />
      <main className="container">
        <Hero />
        {children}
      </main>
    <Footer />
  </div>
);