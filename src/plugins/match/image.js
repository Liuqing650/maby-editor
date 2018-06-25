// @flow
import { Range } from "slate";

export default function(type, currentTextNode, matched, change) {
  const matchedLength = matched[0].length;
  
  return change
    .deleteAtRange(
      Range.create({
        anchorKey: currentTextNode.key,
        focusKey: currentTextNode.key,
        anchorOffset: matched.index,
        focusOffset: matched.index + matchedLength
      })
    )
    .insertBlock({
      type,
      isVoid: true,
      data: {
        title: matched[1] || '',
        src: matched[2]
      }
    })
    .collapseToStartOfNextText();
}
