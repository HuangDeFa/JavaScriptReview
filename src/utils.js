
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
    } else if (value instanceof Date) {
      target[key] = new Date(value.valueOf());
    } else {
      target[key] = deepClone(value, clonedList);
    }
  }
  return target;
}

/**
 * 实现 nextTick
 * @param {Function} fn
 */
export function nextTick(fn) {
  if (typeof fn === 'function') {
    if (Promise in window) {
      Promise.resolve().then(() => {
        fn();
      });
    } else if (MutationObserver in window) {
      let counter = 1;
      const observer = new MutationObserver(fn);
      const textNode = document.createTextNode(counter.toString());
      observer.observe(textNode, { characterData: true });
      counter+=1;
      textNode.data = String(counter);
    } else {
      setTimeout(() => {
        fn();
      }, 0);
    }
  }
}

/**
 * 自定义 Function Bind
 */
export function customBind(thisArg) {
  const fn = this;
  if (typeof fn !== 'function') throw new Error('This must be call by a function');
  const args1 = Array.prototype.slice(arguments, 1);
  return function () {
    const args = Array.prototype.slice(arguments, 0);
    return fn.call(thisArg, args1.concat(args));
  };
}

/**
 * 自定义 Promise
 */
export class CustomPromise{
  state = 'pending';
  constructor(fn){
    this.cbs = [];
    if (typeof fn !== 'function') throw new Error('This must be a function');
    fn(this.resolve.bind(this),this.reject.bind(this));
  }
  resolve(){
    if(this.state=='pending'){
      const args = Array.prototype.slice(arguments,0);
      this.state = 'resolve';
      setTimeout(() => {
        this.cbs.forEach(cb=>{
          if(cb['success'])
            cb['success'](args[0])
        });
      }, 0);
    }
  }
  reject(){
    if(this.state == 'pending'){
      this.state = 'reject';
      const reason = Array.prototype.slice(arguments,0)[0];
      setTimeout(() => {
        this.cbs.forEach(cb=>{
          if(cb['fail'])
            cb['fail'](reason)
        });
      }, 0);
      
    }
  }
  then(){
    const args = Array.prototype.slice(arguments,0);
    if(args.length){
    const handle = {};
    if(typeof args[0] =='function'){
      handle['success'] = args[0];
    }
    if(args[1] && typeof args[1]=='function'){
      handle['fail'] = args[1];
    }
    this.cbs.push(handle);
  }
  }   
}

export class EventHub{
  contructure(){
    this.hub = {};
  }

  /**
   * 订阅事件
   * @param {string} event
   * @param {function} handler
   */
  on(event,handler){
    if(!event || typeof event!=='string')return;

    this.hub[event] = this.hub[event] || [];
    this.hub[event].push(handler);
  }

  /**
   * 订阅一次性事件
   * @param {string} event
   * @param {function} handler
   */
  once(event,handler){
    if(!event || typeof event!=='string')return;
    this.hub[event] = this.hub[event] || [];
    const fn = (function(){
      let isRun = false;
      return function(){
        if(!isRun){
          handler && handler();
          isRun = true;
        }
      }
    });
  }

  /**
   * 移除事件
   * @param {string} event
   * @param {function} fn
   */
  remove(event,fn){
    if(!event || typeof event!=='string')return;
   if(this.hub[event]){
     const index = this.hub[event].indexOf(fn);
     if(index!=-1){
       this.hub[event].splice(index,1);
     }
   }
  }

  /**
   * 发布事件
   * @param {string} event
   * @param {any} data
   */
  emit(event,data){
    if(!event || typeof event!=='string')return;
    const handler = this.hub[event];
    if(handler){
      handler.forEach(fn=>{
        fn(data);
      });
    }
  }

}
