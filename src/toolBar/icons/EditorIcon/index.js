import React from 'react';
import { Icon } from 'antd';
import * as SVG from '../../../svg';

const EditorIcon = ({ type, className }) => {
  return <Icon component={SVG[type]} className={className} />;
};

export default EditorIcon;
