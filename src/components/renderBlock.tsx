import * as React from 'react';

import isHotkey from 'is-hotkey';
import { Editor } from 'slate';
import { RenderBlockProps } from 'slate-react';

import typesConfig from '../config';

import Paragraph from './BlockCom/Paragraph';

export default (types?: any, hotkey?: string): any => {
  const { BLOCK } = typesConfig;
  return {
    renderBlock(props: RenderBlockProps, editor: Editor, next: any): any {
      const { data } = props.node;
      if (data.get && typeof data.get === 'function') {
        const style = data.get('style');
        props.attributes = { ...props.attributes, style};
      }
      switch (props.node.type) {
        case BLOCK.PARAGRAPH:
          return <Paragraph {...props} />;
        default:
          next();
          break;
      }
    },
    onKeyDown(event: any, editor: Editor, next: any): any {
      if (hotkey && isHotkey(hotkey, event)) {
        event.preventDefault();
        const isThisType: boolean = editor.value.blocks.some((block: any) => (block.type === types.type));
        editor.command((change: Editor): Editor => change.setBlocks(!isThisType ? types.type : BLOCK.PARAGRAPH));
        return editor;
      }
      next();
    }
  };
};
