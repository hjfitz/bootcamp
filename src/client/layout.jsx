import React from 'react';
import { Header, Footer } from './partial';

export default ({ children }) => (
  <div id="react-app">
    <Header />
    <main className="container">
      {children}
    </main>
    <Footer />
  </div>
);
