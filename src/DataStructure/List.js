// / List
export default class List {
  constructor() {
    this.dataSource = [];
    this.size = 0;
  }

  add(item) {
    this.dataSource.push(item);
    this.size++;
  }

  remove(item) {
    const index = this.dataSource.findIndex((x) => x === item);
    if (index > -1) {
      this.size--;
      return this.dataSource.splice(index, 1)[0];
    }
    return undefined;
  }

  /**
     * Insert new item of index
     * @param item
     * @param index zore-based index
     */
  insert(item, index) {
    this.dataSource.splice(index, 0, item);
  }

  clear() {
    this.dataSource.length = 0;
    this.size = 0;
  }

  * [Symbol.iterator]() {
    // eslint-disable-next-line guard-for-in
    for (let i = 0; i < this.dataSource.length; i++) {
      yield this.dataSource[i];
    }
  }
}
