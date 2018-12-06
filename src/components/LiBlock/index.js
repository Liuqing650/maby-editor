import React from 'react';

const LiBlock = (props) => {
  return (
    <li {...props.attributes}>{props.children}</li>
  );
};
export default LiBlock;
