import React from 'react';

const Deleteline = (props) => {
  return (
    <del {...props.attributes}>{props.children}</del>
  );
};
export default Deleteline;
