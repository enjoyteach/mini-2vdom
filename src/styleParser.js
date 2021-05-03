/**
 * 将html标签的style属性的字符串解析为{key: value}的形式
 *
 * @param {string} str
 * @return {object}
 */

function styleParser(str) {
  if (!str) return {};

  const styles = {};

  str.split(';').forEach(statement => {
    const [key, val] = statement.trim().split(':');
    if (key.trim()) {
      styles[key.trim()] = val && val.trim();
    }
  })

  return styles;
}

export default styleParser;
