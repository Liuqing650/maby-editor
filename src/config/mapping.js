import React from 'react';
import Html from 'slate-html-serializer';
import { Value } from 'slate';
import TAGS from '../dict/tags';
import * as _hotKey from './hotKey';
import Plain from 'slate-plain-serializer';
const { BLOCK, MARK } = TAGS;
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
  tools.map((item) => {
    Object.keys(BLOCK).map((key) => {
      if (item[BLOCK[key]]) {
        item.type = 'block';
        item.key = BLOCK[key];
        item.title = _hotKey.setHotKeysTitle(item.key);
      }
    });
    Object.keys(MARK).map((key) => {
      if (item[MARK[key]]) {
        item.type = 'mark';
        item.key = MARK[key];
        item.title = _hotKey.setHotKeysTitle(item.key);
      }
    });
  });
  return tools;
}
