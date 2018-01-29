import React from 'react';
import { isKeyHotkey } from 'is-hotkey';

/**
 * Define hotkey matchers.
 *
 * @type {Function}
 */

const isBoldHotkey = isKeyHotkey('mod+b');
const isItalicHotkey = isKeyHotkey('mod+i');
const isUnderlinedHotkey = isKeyHotkey('mod+u');
const isCodeHotkey = isKeyHotkey('mod+`');


class ToolBar extends React.Component {
  render() {
    const { 
      tools, 
      onSelect,
    } = this.props;
    return (
      <div className="maby-nav">
      </div>
    );
  }
}
export default ToolBar;
