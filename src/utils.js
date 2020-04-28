
/**
 * get the type as string
 * @returns string
 */
export function getType(obj) {
  return Object.prototype.toString.call(obj);
}
export const isDef = (obj) => obj !== undefined;

export const isPrimitive = (value) => {
  const type = getType(value);
  return type === '[object Number]' || type === '[object Boolean]' || type === '[object Undefined]'
    || type === '[object Symbol]' || type === '[object String]' || type === '[object Null]';
};
const isRegexp = (obj) => getType(obj) === '[object RegExp]';

// eslint-disable-next-line consistent-return
export function extend(obj) {
  if (isDef(obj)) {
    if (getType(obj) !== '[object Function]') {
      throw new Error('the object is not Function');
    }
    // eslint-disable-next-line no-inner-declarations
    function Sub() {
      if (!(this instanceof Sub)) throw new Error('must use new statement to create instance');
      obj.call(this);
    }
    Sub.prototype = Object.create(obj.prototype);
    Sub.prototype.contructure = Sub;
    return Sub;
  }
}

export function deepClone(source, clonedList = []) {
  if (isPrimitive(source)) return source;
  // eslint-disable-next-line no-param-reassign
  clonedList = clonedList || [];
  const cloned = clonedList.find((x) => x === source);
  if (cloned) {
    console.log('循环引用...');
    return cloned;
  }
  const keys = Object.keys(source);
  const target = {};
  clonedList.push(source);
  for (let i = 0; i < keys.length; i++) {
    const key = keys[i];
    const value = source[key];
    if (isPrimitive(value)) {
      target[key] = value;
    } else if (Array.isArray(value)) {
      target[key] = [];
      for (let j = 0; j < value.length; j++) {
        const v = value[j];
        target[key][j] = deepClone(v, clonedList);
      }
    } else if (isRegexp(value)) {
      target[key] = new RegExp(value);
    } else {
      target[key] = deepClone(value, clonedList);
    }
  }
  return target;
}
