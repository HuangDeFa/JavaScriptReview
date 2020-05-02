/* eslint-disable import/extensions */
/* eslint-disable no-restricted-syntax */
import { deepClone } from './src/utils.js';
import List from './src/DataStructure/List.js';
import LinkList from './src/DataStructure/LinkList.js';
import {
  bubbleSort, selectedSort, insertedSort, basedSort, bucketSort,
  countingSort, mergeSort, shellSort, quickSort,
} from './src/Algorithms/BaseAlgorithms.js';

(function main() {
  console.log('Hello world is the best entery point');
  listTest();
  utilsTest();
  linkListTest();
 
  let result = bubbleSort([10, 8, 3, 2, 2, 4, 9, 5, 4, 3]);
  console.log('bubble sort datas ', ...result);
  result = selectedSort([10, 8, 3, 2, 2, 4, 9, 5, 4, 3]);
  console.log('selection sort datas ', ...result);
  result = insertedSort([10, 8, 3, 2, 2, 4, 9, 5, 4, 3]);
  console.log('insert sort datas ', ...result);
  result = basedSort([10, 8, 109, -8, 220, 30, 120, -12, 89, 3, 2, 2, 4, 9, 5, 4, 3]);
  console.log('based sort datas ', ...result);
  result = bucketSort([10, 8, 109, -8, 220, 30, 120, -12, 89, 3, 2, 2, 4, 9, 5, 4, 3]);
  console.log('bucket sort datas ', ...result);
  result = countingSort([10, 8, 109, 220, 30, 120, 89, 3, 2, 2, 4, 9, 5, 4, 3]);
  console.log('count sort datas ', ...result);
  result = mergeSort([10, 8, 109, -8, 220, 30, 120, -12, 89, 3, 2, 2, 4, 9, 5, 4, 3]);
  console.log('merge sort datas ', ...result);
  result = shellSort([10, 8, 109, -8, 220, 30, 120, -12, 89, 3, 2, 2, 4, 9, 5, 4, 3]);
  console.log('shell sort datas ', ...result);
  result = quickSort([10, 8, 109, -8, 220, 30, 120, -12, 89, 3, 2, 2, 4, 9, 5, 4, 3]);
  console.log('quick sort datas ', ...result);
}());

function utilsTest() {
  const company = {
    id: 1,
    name: 'WX',
    isOperation: true,
    address: {
      state: 'china',
      provice: 'GuangDong',
      city: 'GuangZhou',
    },
  };
  company.staffs = [
    {
      userId: 1,
      userName: 'wang ni ma',
      company,
      department: 'RND',
    },
    {
      userId: 2,
      userName: 'wang ni ma2',
      company,
      department: 'RND',
    },
    {
      userId: 3,
      userName: 'wang ni ma3',
      company,
      department: 'IT',
    },
  ];
  const clonedCompany = deepClone(company);
  console.log(clonedCompany);
}
function listTest() {
  const list = new List();
  list.add('hello world 1');
  list.add('hello world 2');
  list.add('hello world 3');
  console.log(`list the data -->${list.size}`, ...list);
  for (const item of list) {
    console.log(`list item is ${item}`);
  }
  list.clear();
  console.log(`list the empty -->${list.size}`, ...list);
}

function linkListTest() {
  const list = new LinkList();
  list.append('link list 1');
  list.append('link list 2');
  list.append('link list 3');
  list.append('link list 4');
  console.log(`list the data -->${list.size}`, ...list);
  list.insert(2, 'insert link list 2');
  console.log(`list the insert data -->${list.size}`, ...list);
  list.remove('link list 4');
  console.log(`list the remove data -->${list.size}`, ...list);
}
