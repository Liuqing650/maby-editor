import React from 'react';

const UlBlock = (props) => {
  return (
    <ul {...props.attributes}>{props.children}</ul>
  );
};
export default UlBlock;
