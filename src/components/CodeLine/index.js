import React from 'react';

const CodeLine = (props) => {
  return (
    <div {...props.attributes} className="code-line">{props.children}</div>
  );
};
export default CodeLine;
