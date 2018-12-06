import React from 'react';

const ListBlock = (props) => {
  const { attributes, children } = props;
  return (
    <div {...attributes}>
      {children}
    </div>
  );
};
export default ListBlock;
