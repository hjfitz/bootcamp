import React from 'react';
import prism from 'prismjs';

export default ({ code, lang }) => {
  const language = prism.languages[lang];
  const __html = prism.highlight(code, language);
  return (
    <div className="row">
      <div className="col s12">
        <pre className="card">
          <code dangerouslySetInnerHTML={ {__html} } />
        </pre>
      </div>
    </div>
  );
};
