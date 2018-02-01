import React from 'react';
import CodeSnippet from './code-snippet';

export default ({ title, subtitle, outcomes, spoiler, day, language }) => (
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
          href="#!"
          data-reveals={title}
          className="btn waves-effect spoiler-button red darken-3"
        >
          Toggle Spoiler
        </a>
      </div>
      <CodeSnippet lang={language} code={spoiler} id={title} />
    </div>
  </li>
);
