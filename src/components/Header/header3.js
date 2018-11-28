import React from 'react';

const Header3 = (props) => {
  const { data } = props.node;
  const style = data.get('style');
  return (<h3 style={style}>{props.children}</h3>);
};
export default Header3;
