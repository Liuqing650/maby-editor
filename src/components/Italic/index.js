import React from 'react';

const Italic = (props) => {
  return (
    <i {...props.attributes}>{props.children}</i>
  );
};
export default Italic;
