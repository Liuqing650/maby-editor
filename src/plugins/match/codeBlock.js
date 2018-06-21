// @flow
import { Range, Data } from "slate";
import type { Change, Node } from "slate";
import { wrapCodeBlock } from '../../changes/code';
import { CODE_BLOCK_OPTIONS } from '../../options';

export default function(
  codeOption: { [string]: any },
  currentTextNode: Node,
  matched: any,
  change: Change,
  lang: ?string
) {
  const matchedLength = matched[0].length;
  let newChange = change;

  if (lang) {
    newChange = change.setBlocks({ data: Data.create({ language: lang }) });
  }
  return wrapCodeBlock(
    CODE_BLOCK_OPTIONS,
    newChange.deleteAtRange(
      Range.create({
        anchorKey: currentTextNode.key,
        focusKey: currentTextNode.key,
        anchorOffset: matched.index,
        focusOffset: matched.index + matchedLength
      })
    )
  );
}
