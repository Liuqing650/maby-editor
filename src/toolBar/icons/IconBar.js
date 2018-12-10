import React from 'react';
import EditorIcon from './EditorIcon';

class IconBar extends React.Component {
  render() {
    const {
      type,
      icon,
      isActive,
      className = 'icon-item',
      activeClassName = 'icon-active',
    } = this.props;
    const iconClassName = isActive ? activeClassName : className;
    return (
      <span
        key={`${type}-${icon}`}
        data-active={isActive || false}
      >
        <EditorIcon type={icon} className={iconClassName} />
      </span>
    );
  }
}
export default IconBar;
