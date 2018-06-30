import { Range, Data } from "slate";
import { wrapCodeBlock } from '../../changes/code';
import { CODE_BLOCK_OPTIONS } from '../../options';

export default function(codeOption, currentTextNode, matched, change, lang) {
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
