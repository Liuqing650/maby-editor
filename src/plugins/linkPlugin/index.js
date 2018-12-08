import isUrl from 'is-url';
import toPascal from 'to-pascal-case';
import { getEventTransfer } from 'slate-react';
import renderBlock from '../../components/renderBlock';
import opts from '../../options';

const { INLINE } = opts;

const hasLinks = (value) => {
  return value.inlines.some(inline => inline.type === type);
};

const unwrapLink = (change) => {
  change.unwrapInline(type);
  return change;
};

const wrapLink = (change, href) => {
  change.wrapInline({
    type: INLINE.LINK,
    data: { href },
  }).collapseToEnd();
  return change;
};
export default (opt) => {
  const pasteOpt = Object.assign({
    type: INLINE.LINK,
    hrefProperty: 'href',
    collapseTo: 'end'
  }, opt);
  const options = Object.assign({
    type: INLINE.LINK,
    getHref: node => node.data.get('href')
  }, opt);
  return {
    ...renderBlock(options),
    onPaste(event, change) {
      const transfer = getEventTransfer(event);
      const { value } = change;
      const { text } = transfer;
      const startText = value.startText;
      if (transfer.type !== 'text' && transfer.type !== 'html') {
        return;
      }
      if (!isUrl(text)) {
        return;
      }
      if (/!\[([^\]]*)\]\(([^\s)]*)\)/.test(startText.text)) {
        return;
      }
      if (/\[([^\]]+)\]\(([^\s)]*)\)/.test(startText.text)) {
        return;
      }
      if (value.isCollapsed) {
        const { startOffset } = value;
        change.insertText(text).moveOffsetsTo(startOffset, startOffset + text.length);
      } else if (hasLinks(value)) {
        change.call(unwrapLink);
      }
      change.call(wrapLink, text);
      if (pasteOpt.collapseTo) {
        change[`collapseTo${toPascal(pasteOpt.collapseTo)}`]();
      }

      return change;
    }
  };
};
