
import Promise from 'es6-promise';
import isImage from 'is-image';
import isUrl from 'is-url';
import logger from 'slate-dev-logger';
import loadImageFile from './load-image-file';
import { extname } from 'path';
import { findNode, getEventRange, getEventTransfer, setEventTransfer } from 'slate-react';

// From: https://github.com/ianstormtaylor/slate-plugins/
/**
 * Insert images on drop or paste.
 *
 * @param {Object} options
 *   @property {Function} insertImage
 *   @property {Array} extensions (optional)
 * @return {Object} plugin
 */

function DropOrPasteImages(options = {}) {
  let {
    insertImage,
    extensions,
  } = options;

  if (options.applyTransform) {
    logger.deprecate('0.6.0', 'The `applyTransform` argument to `slate-drop-or-paste-images` has been renamed to `insertImage` instead.')
    insertImage = options.applyTransform;
  }

  if (!insertImage) {
    throw new Error('You must supply an `insertImage` function.');
  }

  /**
   * Check file extension against user-defined options.
   *
   * @param {Type} string
   * @return {Boolean}
   */

  function matchExt(type) {
    let accepted = false;
    for (const ext of extensions) {
      if (type.includes(ext)) accepted = true;
    }
    return accepted;
  }


  /**
   * Apply the change for a given file and update the editor with the result.
   *
   * @param {Change} change
   * @param {Editor} editor
   * @param {Blob} file
   * @return {Promise}
   */

  function asyncApplyChange(change, editor, file) {
    return Promise.resolve(insertImage(change, file, editor)).then(() => {
      editor.onChange(change);
    })
  }


  /**
   * On drop or paste.
   *
   * @param {Event} event
   * @param {Change} change
   * @param {Editor} editor
   * @return {State}
   */

  function onInsert(event, change, editor) {
    const transfer = getEventTransfer(event);
    console.log('transfer----->', transfer);
    
    const range = getEventRange(event, change.value);
    switch (transfer.type) {
      case 'files': return onInsertFiles(event, change, editor, transfer, range);
      case 'html': return onInsertHtml(event, change, editor, transfer, range);
      case 'node': return onInsertNode(event, change, editor, transfer, range);
      case 'text': return onInsertText(event, change, editor, transfer, range);
    }
  }

  /**
   * On drop or paste files.
   *
   * @param {Event} event
   * @param {Change} change
   * @param {Editor} editor
   * @param {Object} transfer
   * @param {Range} range
   * @return {Boolean}
   */

  function onInsertFiles(event, change, editor, transfer, range) {
    const { files } = transfer;
    for (const file of files) {
      if (extensions) {
        const type = file.type;
        const [ , ext ] = type.split('/');
        if (!matchExt(ext)) continue;
      }
      if (range) {
        change.select(range);
      }
      asyncApplyChange(change, editor, file);
    }
    return true
  }

  /**
   * On drop or paste html.
   *
   * @param {Event} event
   * @param {Change} change
   * @param {Editor} editor
   * @param {Object} transfer
   * @param {Range} range
   * @return {Boolean}
   */

  function onInsertHtml(event, change, editor, transfer, range) {
    const { html } = transfer;
    const parser = new DOMParser();
    const doc = parser.parseFromString(html, 'text/html');
    const body = doc.body;
    const firstChild = body.firstChild;
    if (firstChild.nodeName.toLowerCase() != 'img') return;

    const src = firstChild.src;

    if (extensions) {
      const ext = extname(src).slice(1);
      if (!matchExt(ext)) return;
    }

    loadImageFile(src, (err, file) => {
      if (err) return;
      const c = editor.value.change();
      if (range) c.select(range);
      asyncApplyChange(c, editor, file);
    })

    return true;
  }

  /**
   * On drop or paste slate node.
   * https://github.com/ianstormtaylor/slate-plugins/issues/8
   * @param {Event} event
   * @param {Change} change
   * @param {Editor} editor
   * @param {Object} transfer
   * @param {Range} range
   * @return {Boolean}
   */

  function onInsertNode(event, change, editor, transfer, range) {
    const { value } = change
    const targetNode = findNode(event.target, value)
    // const targetRange = getEventRange(event, value)

    // expected image src
    const src = transfer.text
    
    loadImageFile(src, (err, file) => {
      if (err) return
      const change = editor.value.change();
      // if (range) {
      //   change.select(range)
      // };
      change.moveToRangeOf(targetNode)
        .moveOffsetsTo(range.anchorOffset, range.focusOffset)
        .removeNodeByKey(transfer.node.key)
      asyncApplyChange(change, editor, file)
    })

    return true
  }

  /**
   * On drop or paste text.
   *
   * @param {Event} event
   * @param {Change} change
   * @param {Editor} editor
   * @param {Object} transfer
   * @param {Range} range
   * @return {Boolean}
   */

  function onInsertText(event, change, editor, transfer, range) {
    const { text } = transfer;
    const { value } = change;
    const startText = value.startText;
    if (!isUrl(text)) return;
    if (!isImage(text)) return;
    if (/!\[([^\]]*)\]\(([^\s)]*)\)/.test(startText.text)) return;
    if (/\[([^\]]+)\]\(([^\s)]*)\)/.test(startText.text)) return;
    loadImageFile(text, (err, file) => {
      if (err) return;
      const c = editor.value.change();
      if (range) c.select(range);
      asyncApplyChange(c, editor, file);
    })

    return true
  }

  /**
   * Return the plugin.
   *
   * @type {Object}
   */

  return {
    onDrop: onInsert,
    onPaste: onInsert,
  }
}

/**
 * Export.
 *
 * @type {Function}
 */

export default DropOrPasteImages
