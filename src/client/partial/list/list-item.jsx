import React from 'react';

export default ({ title, subtitle, outcomes, spoiler, day, presenter, language }) => (
  <li>
    <div className="collapsible-header">
      <span className="title">{day}</span>
      <p>{subtitle}</p>
    </div>
    <div className="collapsible-body">
      <span className="title">Outcomes:</span>
      <p>{outcomes}</p>
      <div className="row">
        <a 
          href="" 
          data-reveals={title}
          className="btn waves-effect spoiler-button red darken-3"
        >
          Toggle Spoiler
        </a>
      </div>
      <pre id={title} className={`card language-${language} spoiler`} data-hidden="true">
        <code className={`language-${language}`}>
  {spoiler}
        </code>
      </pre>
    </div>
  </li>
);