// @flow

export default function(type, currentTextNode, matched, change) {
  return change
    .removeNodeByKey(currentTextNode.key)
    .insertBlock({
      type,
      isVoid: true
    })
    .collapseToStartOfNextBlock();
}
