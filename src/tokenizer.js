import Scanner from './Scanner';
import propsParser from './propsParser';
import { isEmptyObject } from './utils';

function tokenizer(html) {
  return nestTokens(collectTokens(html));
}

/**
 * 将html字符串转为无嵌套结构的token，返回tokens数组
 *
 * @param {string} html
 * @return {array} 
 */
function collectTokens(html) {
  const scanner = new Scanner(html);
  const tokens = [];

  let word = '';
  // console.log(html);
  while (!scanner.eos()) {
    // 扫描文本
    const text = scanner.scanUntil('<');
    scanner.scan('<');
    tokens[tokens.length - 1] && tokens[tokens.length - 1].push(text);
    // 扫描标签<>中的内容
    word = scanner.scanUntil('>');
    scanner.scan('>');
    // 如果没有扫描到值，就跳过本次进行下一次扫描
    if (!word) continue;
    // 区分开始标签 # 和结束标签 /
    if (word.startsWith('/')) {
      tokens.push(['/', word.slice(1)]);
    } else {
      // 如果有属性存在，则解析属性
      const firstSpaceIdx = word.indexOf(' ');
      if (firstSpaceIdx === -1) {
        tokens.push(['#', word, {}]);
      } else {
        // 解析属性
        const data = propsParser(word.slice(firstSpaceIdx))
        tokens.push(['#', word.slice(0, firstSpaceIdx), data]);
      }
    }
  }

  return tokens;
}

function nestTokens(tokens) {
  const nestedTokens = [];
  const stack = [];
  let collector = nestedTokens;

  for (let i = 0, len = tokens.length; i < len; i++) {
    const token = tokens[i];

    switch (token[0]) {
      case '#':
        // 收集当前token
        collector.push(token);
        // 压入栈中
        stack.push(token);
        // 由于进入了新的嵌套结构，新建一个数组保存嵌套结构
        // 并修改collector的指向
        if (isEmptyObject(token[2])) {
          token.splice(2, 0, []);
          collector = token[2] = [];
        } else {
          token.splice(2, 0, []);
          collector = token[2];
        }

        break;
      case '/':
        // 出栈
        stack.pop();
        // 将收集器指向上一层作用域中用于存放嵌套结构的数组
        collector = stack.length > 0
          ? stack[stack.length - 1][2]
          : nestedTokens;
        break;
      default:
        collector.push(token);
    }
  }

  return nestedTokens;
}

export default tokenizer;
