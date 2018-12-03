import SlateEditCodePlugin from 'slate-edit-code';

export default function(options) {
  const codePlugin = SlateEditCodePlugin({
    onlyIn: node => node.type === options.codeType
  });
  return {
    deserialize(element, next) {
      if (element.tagName && element.tagName.toLowerCase() === 'pre') {
        const cls = element.childNodes[0].className;
        const matched = cls && cls.match(/(?:lang|language)-(\w+)/);
        const codeBlockNode = codePlugin.utils.deserializeCode(element.textContent);
        if (matched) {
          const codeBlock = codeBlockNode.toJSON();
          codeBlock.data = { syntax: matched[1] };
          return codeBlock;
        }
        return codeBlockNode;
      }
    },
    serialize(obj, children) {
      if (obj.object === 'block' && obj.type === options.codeLineType) {
        return <div>{children}</div>;
      } else if (obj.object === 'block' && obj.type === options.codeType) {
        const syntax = options.getSyntax(obj);
        const props = {
          className: syntax && `lang-${syntax}`
        };
        return (
          <pre>
            <code {...props}>{children}</code>
          </pre>
        );
      }
    }
  };
}
