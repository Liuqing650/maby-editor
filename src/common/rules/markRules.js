export default function(Tag, markType) {
  return {
    deserialize(element, next) {
      console.log('element--------->', element);
      if (markType && element.tagName && element.tagName.toLowerCase() === Tag) {
        const data = {};
        const style = {};
        if (element.style.backgroundColor) {
          style.backgroundColor = element.style.backgroundColor;
        }

        if (element.style.color) {
          style.color = element.style.color;
        }

        if (element.style.fontSize) {
          style.fontSize = element.style.fontSize;
        }

        if (element.style.letterSpacing) {
          style.letterSpacing = element.style.letterSpacing;
        }
        data.style = style;
        return {
          object: 'mark',
          type: markType,
          data,
          nodes: next(element.childNodes)
        };
      }
    }
  };
}
