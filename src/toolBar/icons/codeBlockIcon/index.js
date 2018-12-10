import React from 'react';
import IconBar from '../IconBar';

class CodeBlockIcon extends React.Component {
  onMouseDown = (event) => {
    event.preventDefault();
    const { value, onChange, plugin } = this.props;
    if (onChange && typeof onChange === 'function') {
      onChange(plugin.changes.toggleCodeBlock(value.change(), 'paragraph').focus());
    }
  }
  render() {
    const { value, item, plugin } = this.props;
    const isActive = plugin.utils.isInCodeBlock(value);
    const iconProps = {
      className: 'icon-box',
      title: item.title,
      onMouseDown: this.onMouseDown
    };
    const iconBarProps = {
      type: item.type,
      icon: item.icon,
      isActive
    };
    return (
      <div {...iconProps}>
        <IconBar {...iconBarProps} />
      </div>
    );
  }
}
export default CodeBlockIcon;
