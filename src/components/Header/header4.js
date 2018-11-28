import React from 'react';

const Header4 = (props) => {
  const { data } = props.node;
  const style = data.get('style');
  return (<h4 style={style}>{props.children}</h4>);
};
export default Header4;
