import Html from 'slate-html-serializer';
import { getEventTransfer } from 'slate-react';
import { DEFAULT_RULES } from '../../common/rules';

const serializer = new Html({ rules: DEFAULT_RULES });

const handlePasteHtml = (html, change) => {
  const { document } = serializer.deserialize(html);
  change.insertFragment(document);
  return true;
};

const handleFragment = (fragment, change) => {
  return change.insertFragment(fragment);
};

export default () => {
  return {
    /**
     * On paste, deserialize the HTML and then insert the fragment.
     *
     * @param {Event} event
     * @param {Change} change
     */
    onPaste: (event, change) => {
      const parser = new DOMParser();
      const transfer = getEventTransfer(event);
      const stringHtml = parser.parseFromString(transfer.html, 'text/html');
      console.log('stringHtml-------->', stringHtml);
      console.log('transfer-------->', transfer);
      switch (transfer.type) {
        case 'html':
          return handlePasteHtml(transfer.html, change);
        case 'fragment':
          return handleFragment(transfer.fragment, change);
        default:
          break;
      }
      return false;
    }
  };
};
