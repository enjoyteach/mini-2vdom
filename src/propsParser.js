import Scanner from './Scanner';

function propsParser(propsStr) {
  propsStr = propsStr.trim();
  const scanner = new Scanner(propsStr);
  const props = {};

  while(!scanner.eos()) {
    let key = scanner.scanUntil('=');

    // 对单属性的处理
    const spaceIdx = key.indexOf(' ');
    if (spaceIdx !== -1) {
      const keys = key.replace(/\s+/g, ' ').split(' ');

      const len = keys.length;
      for (let i = 0; i < len - 1; i++) {
        props[keys[i]] = true;
      }
      key = keys[len - 1].trim();
    }
    scanner.scan('="');

    const val = scanner.scanUntil('"');
    props[key] = val || true;
    scanner.scan('"');
  }

  return props;
}

export default propsParser;
