/**
 * 将html标签的class属性的字符串解析为{key: boolean}的形式
 *
 * @param {string} str
 * @return {object}
 */
function classParser(str) {
  if (!str) return {};

  const classNames = {};
  str.replace(/\s+/g, ' ')
     .split(' ')
     .forEach(key => classNames[key] = true)

  return classNames;
}

export default classParser;
