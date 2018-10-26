import { getEventRange, getEventTransfer } from 'slate-react';

function ImagesPlugin(options) {
  const { extensions = ['png', 'jpeg'], insertImage } = options;

  if (!insertImage) {
    throw new Error('You must supply an `insertImage` function.');
  }

  function matchExt(type) {
    if (extensions && Array.isArray(extensions)) {
      return extensions.includes(type);
    }
    return false;
  }

  function asyncApplyChange(change, editor, file) {
    return Promise.resolve(insertImage(change, file, editor)).then(() => {
      editor.onChange(change);
    });
  }

  function onInsert(event, change, editor) {
    const transfer = getEventTransfer(event);
    const range = getEventRange(event, change.value);
    console.log('range---->', range);
    console.log('transfer---->', transfer);
    switch (transfer.type) {
      case 'files': return onInsertFiles(event, change, editor, transfer, range);
    }
  }

  function onInsertFiles(event, change, editor, transfer, range) {
    const { files } = transfer;
    files.forEach(file => {
      if (extensions) {
        const type = file.type;
        const [, ext] = type.split('/');
        if (!matchExt(ext)) {
          return;
        }
      }
      if (range) {
        change.select(range);
      }
      asyncApplyChange(change, editor, file);
    });
  }
  return {
    onDrop: onInsert,
    onPaste: onInsert,
  };
}

export default ImagesPlugin;
