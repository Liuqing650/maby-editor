// @flow
export default function trailingSpace(
  change,
  currentTextNode,
  offsetIndex
) {
  change.insertTextByKey(currentTextNode.key, offsetIndex, " ");
}
