import React from 'react';

const Header5 = (props) => {
  const { data } = props.node;
  const style = data.get('style');
  return (<h5 style={style}>{props.children}</h5>);
};
export default Header5;
