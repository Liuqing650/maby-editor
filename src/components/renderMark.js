import React from 'react';
import isHotkey from 'is-hotkey';
import Bold from './Bold';
import PrismSpan from './PrismSpan';
import SpanMark from './SpanMark';
import Underline from './Underline';
import Italic from './Italic';
import Deleteline from './Deleteline';
import Code from './Code';
import Link from './Link';

import opts from '../options';

const { MARKS } = opts;

export default (options, hotkey) => {
  return {
    renderMark(props) {
      const { data, type } = props.mark;
      if (data.get && typeof data.get === 'function') {
        const style = data.get('style');
        props.attributes = { ...props.attributes, style };
      }
      switch (type) {
        case MARKS.BOLD:
          return <Bold {...props} />;
        case MARKS.LINK:
          return <Link {...props} options={options} />;
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
          if (type) { // 高亮代码
            return <PrismSpan {...props} />;
          }
      }
    },
    onKeyDown(event, change) {
      if (hotkey && isHotkey(hotkey, event)) {
        event.preventDefault();
        change.call(change => change.toggleMark(options.type));
        return change;
      }
    }
  };
};
