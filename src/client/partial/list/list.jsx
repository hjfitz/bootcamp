import React from 'react';

export default ({ children, header }) => (
  <ul className="collapsible" data-collapsible="accortion">
    <li className="collection-header"><h4>{header}</h4></li>
    {children}
  </ul>
);
