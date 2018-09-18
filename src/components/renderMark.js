import React from 'react';
import isHotkey from 'is-hotkey';
import Bold from './Bold';
import Paragraph from './Paragraph';
import opts from '../options';

const { MARKS } = opts;

export default (options, hotkey) => {
  return {
    renderMark(props) {
      switch (props.mark.type) {
        case MARKS.BOLD:
          return <Bold {...props} />;
        default:
          return <Paragraph {...props} />;
      }
    },
    onKeyDown(event, change) {
      if (isHotkey(hotkey, event)) {
        change.call(change => change.toggleMark(options.type));
      }
    }
  };
};
