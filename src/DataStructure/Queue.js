export default class Queue {
  constructor() {
    this.dataSource = [];
    this.size = 0;
  }

  enqueue(item) {
    this.dataSource.push(item);
    this.size++;
  }

  dequeue() {
    this.dataSource.shift();
    this.size--;
  }

  peek() {
    if (this.size > 0) return this.dataSource[this.size - 1];
    return undefined;
  }

  clear() {
    this.dataSource.length = 0;
    this.size = 0;
  }

  * [Symbol.iterator]() {
    for (let i = 0; i < this.size; i++) {
      yield this.dataSource[i];
    }
  }
}
