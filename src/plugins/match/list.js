// @flow
import { Range } from "slate";
import type { Change, Node } from "slate";
import blocklist from "../../helper/block-list";

export default function(
  listOption: any,
  currentTextNode: Node,
  matched: any,
  change: Change,
  ordered: boolean
) {
  const matchedLength = matched[0].length;
  const newChange = change.deleteAtRange(
    Range.create({
      anchorKey: currentTextNode.key,
      focusKey: currentTextNode.key,
      anchorOffset: matched.index,
      focusOffset: matched.index + matchedLength
    })
  );

  return blocklist(newChange, {
    ...listOption,
    ordered
  });
}
