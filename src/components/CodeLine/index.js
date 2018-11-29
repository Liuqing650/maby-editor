import React from 'react';

const CodeLine = (props) => {
  return (
    <div {...props.attributes}>{props.children}</div>
  );
};
export default CodeLine;
