import React from 'react';

const OlBlock = (props) => {
  return (
    <ol {...props.attributes}>{props.children}</ol>
  );
};
export default OlBlock;
