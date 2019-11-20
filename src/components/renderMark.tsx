import * as React from 'react';

import isHotkey from 'is-hotkey';
import { Editor } from 'slate';
import { RenderMarkProps } from 'slate-react';

import typesConfig from '../config';

import Bold from './MarkCom/Blod';
// import PrismSpan from './MarkCom/PrismSpan';
import SpanMark from './MarkCom/SpanMark';

export default (types?: any, hotkey?: string): any => {

  const { MARK } = typesConfig;
  return {
    renderMark(props: RenderMarkProps, editor: Editor, next: any): any {
      const { data, type } = props.mark;
      if (data.get && typeof data.get === 'function') {
        const style = data.get('style');
        props.attributes = { ...props.attributes, style };
      }
      console.log('type----->', type);
      switch (type) {
        case MARK.BOLD:
          return <Bold {...props} />;
        case MARK.SPAN:
          return <SpanMark {...props} />;
        default:
          // if (type) { // 高亮代码
          //   return <PrismSpan {...props} />;
          // }
          return next();
      }
    },
    onKeyDown(event: Event, editor: Editor, next: any): any {
      if (hotkey && isHotkey(hotkey, event)) {
        event.preventDefault();
        console.log('types=====>', types);
        editor.toggleMark(types.type);
        // editor.command((change: Editor): Editor => change.toggleMark(types.type));
      } else {
        return next();
      }
    }
  };
};
