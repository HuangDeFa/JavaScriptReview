// 基础搜索算法

/**
 * 二分法
 * @param {Array} arr
 * @param {any} search
 * @returns {number} 数组的下标，-1表示没找到
 */
export function BinarySearch(arr, search) {
  if (Array.isArray(arr) && arr.length > 0) {
    const sort = (data) => {
      const len = data.length;
      for (let i = 1; i < len; i++) {
        let j = i;
        const temp = arr[i];
        while (j > 0 && arr[j - 1] > temp) {
          data[j] = arr[j - 1];
          j--;
        }
        if (j !== i) {
          data[j] = temp;
        }
      }
    };
    sort(arr);
    let begin = 0;
    let end = arr.length - 1;
    const mid = (begin + end) >> 1;
    while (begin <= end) {
      if (arr[mid] === search) {
        return mid;
      }
      if (arr[mid] > search) end = mid - 1;
      if (arr[mid] < search) begin = mid + 1;
    }
    return -1;
  }
}

/**
 * 在二叉树中搜索出所有符合的节点
 * @param {object }rootNode
 * @param {any} search
 * @returns {Array|null}
 */
export function BinaryTreeSearch(rootNode, search) {
  if (!rootNode) return null;
  const results = [];
  const match = (node, key, collection) => {
    if (node) {
      if (node.value === key) {
        collection.push(node);
      }
      if (node.left)match(node.left, search, collection);
      if (node.right)match(node.right, search, collection);
    }
  };
  match(rootNode, search, results);

  return results;
}
