import Scanner from './Scanner';

function propsParser(propsStr) {
  propsStr = propsStr.trim();

  const scanner = new Scanner(propsStr);

  const props = {};

  while(!scanner.eos()) {
    const key = scanner.scanUntil('=');
    scanner.scan('="');

    const val = scanner.scanUntil('"');
    props[key] = val;
    scanner.scan('"');
  }

  return props;
}

export default propsParser;