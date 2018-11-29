import React from 'react';

const Code = (props) => {
  return (
    <code {...props.attributes} className="code-mark">{props.children}</code>
  );
};
export default Code;
