import React from 'react';
import prism from 'prismjs';

export default ({ code, lang, id }) => {
  const language = prism.languages[lang];
  const inner = { __html: prism.highlight(code, language) };
  return (
    <pre id={id} className="card spoiler">
      <code dangerouslySetInnerHTML={inner} />
    </pre>
  );
};
