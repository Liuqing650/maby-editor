import { Editor } from 'slate';
import Html from 'slate-html-serializer';
import { Plugin } from 'slate-react';
import { getEventTransfer } from 'slate-react';
import { DEFAULT_RULES } from '../../config/rules';

const serializer = new Html({ rules: DEFAULT_RULES });

const handlePasteHtml = (html, change) => {
  const { document } = serializer.deserialize(html);
  change.insertFragment(document);
  return true;
};

const handleFragment = (fragment, change) => {
  return change.insertFragment(fragment);
};

const pastePlugin = (): any => {
  return {
    /**
     * On paste, deserialize the HTML and then insert the fragment.
     *
     * @param {Event} event
     * @param {Editor} change
     */
    onPaste: (event: Event, editor: Editor, next: any): any => {
      const parser = new DOMParser();
      const transfer = getEventTransfer(event);
      console.log('transfer-------->', transfer);
      switch (transfer.type) {
        case 'html':
          const stringHtml = parser.parseFromString(transfer.type, 'text/html');
          console.log('stringHtml-------->', stringHtml);
          return handlePasteHtml(transfer.node, editor);
        case 'fragment':
          return handleFragment(transfer.node, editor);
        default:
          break;
      }
      return false;
    }
  };
};

export default (): Plugin => pastePlugin();
