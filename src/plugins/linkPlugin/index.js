import isUrl from 'is-url';
import toPascal from 'to-pascal-case';
import { getEventTransfer } from 'slate-react';
import renderMark from '../../components/renderMark';
import opts from '../../options';

const { MARKS } = opts;

const hasLinks = (value) => {
  return value.inlines.some(inline => inline.type === type);
};

const unwrapLink = (change) => {
  change.unwrapInline(type);
};

const wrapLink = (change, href) => {
  change.wrapInline({
    type,
    data: { href },
  });
};
export default (opt) => {
  const pasteOpt = Object.assign({
    type: MARKS.LINK,
    hrefProperty: 'href',
    collapseTo: 'end'
  }, opt);
  const options = Object.assign({
    type: MARKS.LINK,
    getHref: mark => mark.data.get('href')
  }, opt);
  return {
    ...renderMark(options),
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
