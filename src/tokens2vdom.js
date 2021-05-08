import classParser from './classParser';
import styleParser from './styleParser';

/**
 * 将toknes转换为虚拟DOM
 *
 * @param {token[]} tokens
 * @return {object} vdom 
 */
function tokens2vdom(tokens) {
  const vdom = {};

  for (let i = 0, len = tokens.length; i < len; i++) {
    const token = tokens[i];
    vdom['sel'] = token[1];
    vdom['data'] = token[3];

    // 解析类名
    if (vdom['data']['class']) {
      vdom['data']['class'] = classParser(vdom['data']['class']);
    }

    // 解析行类样式
    if (vdom['data']['style']) {
      vdom['data']['style'] = styleParser(vdom['data']['style']);
    }

    // 添加key
    if (vdom['data']['key']) {
      vdom['key'] = vdom['data']['key'];
      delete vdom['data']['key'];
    } else  {
      vdom['key'] = undefined;
    }

    if (token[4]) {
      vdom['text'] = token[token.length - 1];
    } else {
      vdom['text'] = undefined;
    }

    vdom['elm'] = undefined;
    
    const children = token[2];
    if (children.length === 0) {
      vdom['children'] = undefined;
      continue;
    };

    vdom['children'] = [];

    for (let j = 0; j < children.length; j++) {
      vdom['children'].push(tokens2vdom([children[j]]));
    }

    if (vdom['children'].length === 0) {
      delete vdom['children'];
    }
  }

  return vdom;
}

export default tokens2vdom;