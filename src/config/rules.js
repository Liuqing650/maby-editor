import React from 'react';
import TAGS from '../dict/tags';
const { BLOCK, MARK } = TAGS;
const htmlRules = [
  {
    // 修改 deserialize 来处理更多类型的 block…
    deserialize(el, next) {
      const type = BLOCK[el.tagName.toLowerCase()]
      if (!type) return
      return {
        object: 'block',
        type: type,
        nodes: next(el.childNodes)
      }
    },
    // 修改 serialize 来处理更多类型的 block…
    serialize(obj, children) {
      if (obj.object != 'block') return
      switch (obj.type) {
        case 'paragraph': return <p>{children}</p>;
        case 'quote': return <blockquote>{children}</blockquote>;
      }
    }
  },
  {
    // 添加一条处理 mark 的新规则…
    deserialize(el, next) {
      const type = MARK[el.tagName.toLowerCase()]
      if (!type) return
      return {
        object: 'mark',
        type: type,
        nodes: next(el.childNodes)
      }
    },
    serialize(obj, children) {
      if (obj.object != 'mark') return
      switch (obj.type) {
        case 'bold': return <strong>{children}</strong>;
        case 'italic': return <em>{children}</em>;
        case 'underlined': return <u>{children}</u>;
        case 'code': return <pre><code>{children}</code></pre>;
      }
    }
  }
]

const rules = {
  html: htmlRules,
}
export default rules;
