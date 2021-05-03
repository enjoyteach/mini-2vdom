export function toString(arg) {
  return Object.prototype.toString.call(arg);
}

export function isObject(arg) {
  return toString(arg) === '[object Object]';
}

export function isEmptyObject(obj) {
  if (isObject(obj)) {
    for (const key in obj) {
      if (obj.hasOwnProperty(key)) return false;
    }
    return true;
  } else {
    return false;
  }
}

export function isArray(arg) {
  return toString(arg) === '[object Array]';
}