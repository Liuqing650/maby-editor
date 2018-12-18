import React from 'react';
import IconBar from '../IconBar';

class ListIcon extends React.Component {
  onMouseDown = (event) => {
    event.preventDefault();
    const { value, onListClick, plugin, item } = this.props;
    const listType = item.listType || null;
    const isActive = plugin.utils.isSelectionInList(value, listType);
    const module = isActive ? 'unwrapList' : 'wrapInList';
    if (onListClick && typeof onListClick === 'function') {
      console.log('listType------>', listType);
      onListClick(module, plugin, listType);
    }
  }
  render() {
    const { value, item, plugin } = this.props;
    const isActive = plugin.utils.isSelectionInList(value, item.listType);
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
export default ListIcon;
