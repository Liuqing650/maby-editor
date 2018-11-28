
export default function(Tag, blockType) {
  return {
    deserialize(element, next) {
      if (blockType && element.tagName && element.tagName.toLowerCase() === Tag) {
        const data = {};
        const style = {};

        if (element.style.textAlign) {
          style.align = element.style.textAlign;
        }

        if (element.style.lineHeight) {
          style.lineHeight = element.style.lineHeight;
        }

        if (element.style.paddingLeft) {
          style.indent = element.style.paddingLeft;
        }
        if (Object.keys(data).length > 0) {
          data.style = style;
          return {
            object: 'block',
            type: blockType,
            data,
            nodes: next(element.childNodes)
          };
        }
        return {
          object: 'block',
          type: blockType,
          nodes: next(element.childNodes)
        };
      }
    }
  };
}
