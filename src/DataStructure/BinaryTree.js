// eslint-disable-next-line import/extensions
import { getType } from '../utils.js';

class Node {
  constructor(data, left, right) {
    this.data = data;
    this.left = left;
    this.right = right;
  }
}

export default class BinaryTree {
  constructor() {
    this._root = null;
    this._valueCompare = function compare(x, y) {
      if (getType(x) !== getType(y)) {
        throw new Error('compare type are different!');
      }
      const type = getType(x);
      if (type === '[object Number]') {
        return x - y > 0 ? 1 : x === y ? 0 : -1;
      } if (type === '[object String]') {
        return x.localeCompare(y);
      }
      return x - y > 0 ? 1 : x === y ? 0 : -1;
    };
    this.size = 0;
    this.level = 0;
  }

  add(item) {
    const node = new Node(item, null, null);
    if (this._root === null) {
      this._root = node;
      this.size++;
      this.level++;
    } else {
      let current = this._root;
      while (true) {
        const parent = current;
        if (this._valueCompare(item, parent.data) > 0) {
          current = current.right;
          if (!current) {
            parent.right = node;
            this.size++;
            break;
          }
        } else {
          current = current.left;
          if (!current) {
            parent.left = node;
            this.size++;
            break;
          }
        }
      }
    }
  }

  find(item) {
    let current = this._root;
    while (current && current.data !== item) {
      current = this._valueCompare(item, current.data) < 0 ? current.left : current.right;
    }
    return current;
  }

  max() {
    let current = this._root.right;
    while (current) {
      current = current.right;
    }
    return current ? current.data : undefined;
  }

  min() {
    let current = this._root.left;
    while (current) {
      current = current.left;
    }
    return current ? current.data : undefined;
  }


  * [Symbol.iterator]() {
    const getData = (node) => {
      if (!node) return;
      getData(node.left);
      getData(node.right);
      // eslint-disable-next-line consistent-return
      return node.data;
    };
    yield getData(this._root);
  }
}
