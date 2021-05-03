import Scanner from './Scanner';

function propsParser(propsStr) {
  propsStr = propsStr.trim();

  const scanner = new Scanner(propsStr);

  const props = {};

  while(!scanner.eos()) {
    let key = scanner.scanUntil('=');

    const spaceIdx = key.indexOf(' ');
    if (spaceIdx !== -1) {
      const k = key.replace(/\s+/g, ' ')
         .split(' ')[0]
      props[k] = true;
      key = key.substring(spaceIdx).trim();
    }
    scanner.scan('="');

    const val = scanner.scanUntil('"');
    props[key] = val || true;
    scanner.scan('"');
  }

  return props;
}

export default propsParser;