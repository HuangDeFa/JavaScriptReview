/* eslint-disable max-classes-per-file */
class Node {
  constructor() {
    this.data = null;
    this.pre = null;
    this.next = null;
  }
}
/**
 * 双向链表
 */
export default class LinkList {
  constructor() {
    this.size = 0;
    this._root = new Node();
  }

  append(data) {
    let current = this._root;
    while (current.next) {
      current = current.next;
    }
    const node = new Node();
    node.data = data;
    node.pre = current;
    current.next = node;
    this.size++;
  }

  /**
        * inster a data in the index
        * @param index zore-based index
        */
  insert(index, data) {
    if (index > this.size - 1) {
      this.append(data);
    } else {
      let current = this._root.next;
      let i = 0;
      while (current && i < index) {
        current = current.next;
        ++i;
      }
      const node = new Node();
      node.data = data;
      node.pre = current.pre;
      current.pre.next = node;

      current.pre = node;
      node.next = current;
      this.size++;
    }
  }

  remove(data) {
    let current = this._root.next;
    while (current && current.data !== data) {
      current = current.next;
    }
    if (current) {
      current.pre.next = current.next;
      if (current.next) current.next.pre = current.pre;
      current = null;
      this.size--;
      return data;
    }
    return undefined;
  }

  clear() {
    this._root.next = null;
    this.size = 0;
  }

  * [Symbol.iterator]() {
    let current = this._root.next;
    while (current) {
      yield current.data;
      current = current.next;
    }
  }
}
