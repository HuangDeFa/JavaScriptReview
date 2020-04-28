export default class Set {
  constructor() {
    this.dataSource = [];
    this.size = 0;
  }

  add(item) {
    if (this.dataSource.findIndex((x) => x === item) === -1) {
      this.dataSource.push(item);
      this.size++;
    }
  }

  remove(item) {
    const index = this.dataSource.findIndex((x) => x === item);
    if (index !== -1) {
      this.size--;
      return this.dataSource.splice(index, 1);
    }
    return undefined;
  }

  union(secondSet) {
    if (secondSet && secondSet instanceof Set) {
      const result = [...this.dataSource];
      // eslint-disable-next-line no-restricted-syntax
      for (const item of secondSet) {
        const value = result.find((x) => x === item);
        if (!value)result.push(value);
      }
      return result;
    }
    return secondSet;
  }

  intersect(secondSet) {
    if (secondSet && secondSet instanceof Set) {
      const result = [];
      // eslint-disable-next-line no-restricted-syntax
      for (const item of secondSet) {
        const value = this.dataSource.find((x) => x === item);
        if (value)result.push(value);
      }
      return result;
    }
    return secondSet;
  }


  * [Symbol.iterator]() {
    for (let i = 0; i < this.size; i++) {
      yield this.dataSource[i];
    }
  }
}
