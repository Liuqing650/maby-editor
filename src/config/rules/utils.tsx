// 下划线转驼峰
export const camelCase = (name: string) => {
  return name.charAt(0) + name.slice(1).replace(/-(\w)/g, (m: string, n: string) => n.toUpperCase());
};
// 解析样式
export const analysisStyle = (style: any) => {
  if (!style) {
    return {};
  }
  const output: any = {};
  const attr = style.trim().split(';');
  if (attr && attr.length === 0) {
    return {};
  }
  attr.map((item: any) => {
    const css = item.trim().split(':');
    if (css && css.length > 0) {
      const name = css[0];
      const isFixer = name.charAt(0) === '-';
      const isNewFont = name.indexOf('font-family') > -1;
      const attrName = camelCase(css[0]);
      const attrValue = css[1];
      if (attrName && attrValue && !isFixer && !isNewFont) {
        output[attrName] = attrValue.trim();
      }
    }
  });
  if (output.width) {
    const width = output.width.replace(/px/g, '');
    output.width = !isNaN(Number(width)) ? Number(width) : '';
  }
  if (output.height) {
    const height = output.height.replace(/px/g, '');
    output.height = !isNaN(Number(height)) ? Number(height) : '';
  }
  return output;
};
