import React from 'react';
import Html from 'slate-html-serializer';
import Plain from 'slate-plain-serializer';
import { Value } from 'slate';
import Marked from '../assets/marked';
import TAGS from '../dict/tags';
import * as _hotKey from './hotKey';
const { BLOCK, MARK, ICON_DICT, MARKDOWN } = TAGS;
// 创建初始值
function valueModel (value) {
  return Value.fromJSON({
    document: {
      nodes: [
        {
          object: 'block',
          type: 'paragraph',
          nodes: [
            {
              object: 'text',
              leaves: [
                {
                  text: value ? value.toJSON() : ''
                }
              ]
            }
          ]
        }
      ]
    }
  })
}; 
function htmlModel(value, html) {
  return html.deserialize(value || '<p></p>');
};
function handleDict(dict, tags) {
  const output = [];
  if (!dict || dict.length === 0) {
    return;
  }
  dict.map((key) => {
    if (tags[key]) {
      const obj = {};
      obj[tags[key]] = key;
      obj.key = tags[key];
      output.push(obj);
    }
  });
  return output;
}
// 解析返回值
function htmlAnalysis(value, html) {
  return html.serialize(value);
}
// 初始值映射
export function valueMapping(value, model, html) {
  let output = '';
  switch (model) {
    case 'json':
      output = valueModel(value);
      break;
    case 'text':
      output = Plain.deserialize(value || '');
      break;
    case 'html':
      output = htmlModel(value, html);
      break;
    default:
      break;
  }
  return output;
};

// 解析值
export function analysisValue(value, model, html) {
  let output = '';
  switch (model) {
    case 'json':
      output = JSON.stringify(value.toJSON());
      break;
    case 'text':
      output = Plain.serialize(value);
      break;
    case 'html':
      output = htmlAnalysis(value, html);
      break;
    default:
      break;
  }
  return output;
}

// 区分节点|mark
export function analysisTools(tools) {
  if (!tools || tools.length === 0) {
    return;
  }
  const loopBlock = (item) => {
    if (item.dict) {
      item.dict.map((dictItem) => {
        Object.keys(BLOCK).map((key) => {
          if (dictItem === key) {
            item.type = 'block';
            item.loop = handleDict(item.dict, BLOCK);
          }
        })
      });
    } else {
      Object.keys(BLOCK).map((key) => {
        if (item[BLOCK[key]]) {
          item.type = 'block';
          item.title = _hotKey.setHotKeysTitle(item.key);
          item.key = BLOCK[key];
        }
      });
    }
  };
  const loopMark = (item) => { 
    Object.keys(MARK).map((key) => {
      if (item[MARK[key]]) {
        item.type = 'mark';
        item.title = _hotKey.setHotKeysTitle(item.key);
        item.key = MARK[key];
      }
    });
  };
  tools.map((item) => {
    loopMark(item);
    if (!item.type) {
      loopBlock(item);
    }
  });
  return tools;
}

// 获取类型
export function getType(chars) {
  if (MARKDOWN[chars]) {
    return (MARKDOWN[chars]);
  } else {
    /**
     * 这里可能需要对多行类型进行状态管理,例如将多行
     * 较好的标记方式为判断是否是空行,如果空行,那么清除原来样式
     * 可以对每一行,也就是每一次回车进行标记
     * 1. blockquote
     * 2. code
     * 3. table
     */
    const data = Marked(chars);
    console.log('data------>', data);
    return null;
  }
}
