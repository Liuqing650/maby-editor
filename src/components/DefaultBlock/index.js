import React from 'react';

const DefaultBlock = (props) => {
  return (
    <div {...props.attributes}>{props.children}</div>
  );
};
export default DefaultBlock;
