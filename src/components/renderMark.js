import React from 'react';
import isHotkey from 'is-hotkey';
import Bold from './Bold';
import Paragraph from './Paragraph';
import SpanMark from './SpanMark';
import Underline from './Underline';
import Italic from './Italic';
import Deleteline from './Deleteline';
import Code from './Code';

import opts from '../options';

const { MARKS } = opts;

export default (options, hotkey) => {
  return {
    renderMark(props) {
      const { data } = props.mark;
      if (data.get && typeof data.get === 'function') {
        const style = data.get('style');
        props.attributes = { ...props.attributes, style };
      }
      switch (props.mark.type) {
        case MARKS.BOLD:
          return <Bold {...props} />;
        case MARKS.SPAN:
          return <SpanMark {...props} />;
        case MARKS.UNDERLINE:
          return <Underline {...props} />;
        case MARKS.ITALIC:
          return <Italic {...props} />;
        case MARKS.STRIKETHROUGH:
          return <Deleteline {...props} />;
        case MARKS.CODE:
          return <Code {...props} />;
        default:
          return <Paragraph {...props} />;
      }
    },
    onKeyDown(event, change) {
      if (hotkey && isHotkey(hotkey, event)) {
        event.preventDefault();
        change.call(change => change.toggleMark(options.type));
      }
    }
  };
};
