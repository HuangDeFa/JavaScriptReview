export default class Stack {
  constructor() {
    this.dataSource = [];
    this.size = 0;
  }

  push(item) {
    this.dataSource.push(item);
    this.size++;
  }

  pop() {
    if (this.size > 0) {
      this.size--;
      return this.dataSource.pop();
    }
    return undefined;
  }

  peek() {
    return this.dataSource[this.size - 1];
  }

  clear() {
    this.dataSource.length = 0;
    this.size = 0;
  }

  * [Symbol.iterator]() {
    for (let i = this.dataSource.length - 1; i >= 0; i--) {
      yield this.dataSource[i];
    }
  }
}
