/**
 * 十大基础排序算法
 * 1. 冒泡排序
 * 2. 选择排序
 * 3. 插入排序
 * 4. 堆排序
 * 5. 归并排序
 * 6. 快速排序
 * 7. 希尔排序
 * 8. 计数排序
 * 9. 桶排序
 * 10.基数排序
 */

export function bubbleSort(data) {
  if (Array.isArray(data)) {
    const array = data;
    const len = array.length;
    for (let i = 0; i < len - 1; i++) {
      let hasChanged = false;
      for (let j = 0; j < len - 1 - i; j++) {
        if (array[j] > array[j + 1]) {
          const temp = array[j + 1];
          array[j + 1] = array[j];
          array[j] = temp;
          hasChanged = true;
        }
      }
      if (!hasChanged) break;
    }
  }
  return data;
}

export function selectedSort(data) {
  if (Array.isArray(data)) {
    const array = data;
    const len = array.length;
    for (let i = 0; i < len - 1; i++) {
      let min = i;
      for (let j = i + 1; j < len; j++) {
        if (array[j] < array[min]) {
          min = j;
        }
      }
      if (min !== i) {
        const temp = array[i];
        array[i] = array[min];
        array[min] = temp;
      }
    }
  }
  return data;
}
// 步骤：1)把第一个元素当做有序序列 2）遍历第未排序序列 并将其插入到有序序列的合适位置
//
export function insertedSort(data) {
  if (Array.isArray(data)) {
    const array = data;
    const len = array.length;
    for (let i = 1; i < len; i++) {
      const temp = array[i];
      let j = i;
      while (j > 0 && temp < array[j - 1]) {
        array[j] = array[j - 1];
        j--;
      }
      if (j !== i) {
        array[j] = temp;
      }
    }
  }
  return data;
}

// 归并排序
function merge(left, right) {
  const result = [];
  let pos = 0;
  result.length = left.length + right.length;
  while (left.length > 0 && right.length > 0) {
    if (left[0] <= right[0]) {
      const temp = left[0];
      result[pos++] = temp;
      left.shift();
    } else {
      const temp = right[0];
      result[pos++] = temp;
      right.shift();
    }
  }
  while (left.length > 0) {
    const temp = left[0];
    result[pos++] = temp;
    left.shift();
  }
  while (right.length > 0) {
    const temp = right[0];
    result[pos++] = temp;
    right.shift();
  }
  // console.log(`merge result ${result}`);
  return result;
}

export function mergeSort(data) {
  if (Array.isArray(data)) {
    if (data.length > 1) {
      const array = data;
      const mid = Math.floor(array.length / 2);
      const left = array.slice(0, mid);
      const right = array.slice(mid, array.length);
      return merge(mergeSort(left), mergeSort(right));
    }
  }
  return data;
}

// 堆排序
export function heapSort(data) {
  if (Array.isArray(data)) {
    if (data.length > 1) {
      const array = data;
    }
  }
  return data;
}

// 快速排序
export function quickSort(data) {
  if (Array.isArray(data)) {
    if (data.length > 1) {
      const array = data;
      const index = Math.floor(array.length / 2);
      const pivot = array.splice(index, 1)[0];
      const left = array.filter((x) => x < pivot);
      const right = array.filter((x) => x >= pivot);
      return quickSort(left).concat([pivot], quickSort(right));
    }
  }
  return data;
}
// 双指针快排
export function quickSort2(data) {
  if (Array.isArray(data) && data.length > 1) {
    const sort = (arr, left, right) => {
      const pivot = arr[left];
      const startIndex = left;
      while (left !== right) {
        while (left < right && arr[right] > pivot) {
          right--;
        }
        while (left < right && arr[left] < pivot) {
          left++;
        }
        if (left < right) {
          const temp = arr[left];
          arr[left] = arr[right];
          arr[right] = temp;
        }
      }
      if (startIndex !== left) {
        const temp = arr[startIndex];
        arr[left] = arr[startIndex];
        arr[startIndex] = temp;
      }
      return left;
    };
    const quickSortInner = (arr, starIndex, endIndex) => {
      if (starIndex < endIndex) {
        const left = sort(arr, starIndex, endIndex);
        quickSortInner(arr, starIndex, left - 1);
        quickSortInner(arr, left + 1, endIndex);
      }
    };
    quickSortInner(data, 0, data.length - 1);
  }
}

// 希尔排序
export function shellSort(data) {
  if (Array.isArray(data)) {
    if (data.length > 1) {
      const array = data;
      let gap = 1;
      while (gap < array.length) {
        gap = gap * 3 + 1;
      }
      while (gap > 0) {
        for (let i = gap; i < array.length; i++) {
          const temp = array[i];
          let j = i - gap;
          while (j >= 0 && array[j] > temp) {
            array[j + gap] = array[j];
            j -= gap;
          }
          array[j + gap] = temp;
        }
        gap = Math.floor(gap / 3);
      }
    }
  }
  return data;
}

// 计数排序
export function countingSort(data) {
  if (Array.isArray(data)) {
    const array = data;
    let max = array[0];
    for (let i = 1; i < array.length; i++) {
      if (array[i] > max) {
        max = array[i];
      }
    }
    const tempArray = [];
    tempArray.length = max + 1;
    // 把原始数据当做新数组的下标，相等时累计下标对应的值
    for (let i = 0; i < array.length; i++) {
      if (tempArray[array[i]]) tempArray[array[i]]++;
      else tempArray[array[i]] = 1;
    }
    let sort = 0;
    for (let i = 0; i < tempArray.length; i++) {
      let count = tempArray[i];
      if (count && count > 0) {
        while (count > 0) {
          array[sort] = i;
          sort++;
          count--;
        }
      }
    }
  }
  return data;
}
// 桶排序
export function bucketSort(data) {
  if (Array.isArray(data)) {
    if (data.length > 1) {
      const array = data;
      const bucketSize = 5;

      let max = array[0];
      let min = array[0];
      for (let i = 1; i < array.length; i++) {
        if (array[i] > max) {
          max = array[i];
        } else if (array[i] < min) {
          min = array[i];
        }
      }
      // 创建桶列表
      const buckets = [];
      buckets.length = Math.floor((max - min) / bucketSize);
      for (let i = 0; i < array.length; i++) {
        const index = Math.floor((array[i] - min) / bucketSize);
        if (!buckets[index])buckets[index] = [];
        buckets[index].push(array[i]);
      }
      array.length = 0;
      // 对每个桶里的数据进行排序
      for (let i = 0; i < buckets.length; i++) {
        if (buckets[i]) {
          array.push(...insertedSort(buckets[i]));
        }
      }
    }
  }
  return data;
}
// 基数排序 ，
export function basedSort(data) {
  if (Array.isArray(data)) {
    const array = data;
    if (array.length > 2) {
      let max = Math.abs(array[0]);
      for (let i = 1; i < array.length; i++) {
        if (Math.abs(array[i]) > max) {
          max = Math.abs(array[i]);
        }
      }
      // 获取最大位数
      const size = (() => {
        let len = 1;
        let temp = Math.floor(max / 10);
        while (temp > 0) {
          len++;
          temp = Math.floor(temp / 10);
        }
        return len;
      })();

      let dev = 1;
      let mod = 10;
      // console.log(`---size---${size}`);
      for (let j = 0; j < size; j++, dev *= 10, mod *= 10) {
        const result = [];
        // 扩大一倍 容纳负数， 0-9 负数，10-19 正数
        // console.log(`---round---${j}`);
        result.length = 10 * 2;
        for (let k = 0; k < array.length; k++) {
          let index = Math.floor((array[k] % mod) / dev);
          index += 10;
          // console.log(`base store index: ${index} value: ${array[k]}`);
          if (!result[index])result[index] = [];
          result[index].push(array[k]);
        }
        array.length = 0;
        for (let l = 0; l < result.length; l++) {
          if (result[l]) {
            array.push(...result[l]);
          }
        }
      }
    }
  }
  return data;
}
