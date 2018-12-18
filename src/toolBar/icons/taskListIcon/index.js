import React from 'react';
import IconBar from '../IconBar';

class TaskListIcon extends React.Component {
  onMouseDown = (event) => {
    event.preventDefault();
    const { value, onListClick, plugin } = this.props;
    const isActive = plugin.utils.isSelectionInList(value);
    const module = isActive ? 'unwrapList' : 'wrapInList';
    if (onListClick && typeof onListClick === 'function') {
      onListClick(module, plugin);
    }
  }
  render() {
    const { value, item, plugin } = this.props;
    const isActive = plugin.utils.isSelectionInList(value);
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
export default TaskListIcon;
