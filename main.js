/* eslint-disable import/extensions */
/* eslint-disable no-restricted-syntax */
import { deepClone } from './src/utils.js';
import List from './src/DataStructure/List.js';
import LinkList from './src/DataStructure/LinkList.js';

(function main() {
  console.log('Hello world is the best entery point');
  listTest();
  utilsTest();
  linkListTest();
  (function bubbleSort(data) {
    const dataSource = data;
    const numElements = dataSource.length;
    let temp;
    for (let outer = numElements; outer >= 2; --outer) {
      for (let inner = 0; inner <= outer - 2; ++inner) {
        if (dataSource[inner] > dataSource[inner + 1]) {
          temp = dataSource[inner];
          dataSource[inner] = dataSource[inner + 1];
          dataSource[inner + 1] = temp;
        }
      }
    }
    console.log('bubble sort datas ', ...dataSource);
  }([10, 8, 3, 2, 2, 4, 9, 5, 4, 3]));

  (function selectionSort(data) {
    const dataSource = data;
    for (let i = 0; i < dataSource.length - 1; i++) {
      let min = i;
      for (let j = i + 1; j <= dataSource.length - 1; j++) {
        if (dataSource[j] < dataSource[min]) {
          min = j;
        }
      }
      if (min !== i) {
        const temp = dataSource[min];
        dataSource[min] = dataSource[i];
        dataSource[i] = temp;
      }
    }
    console.log('selection sort datas ', ...dataSource);
  }([10, 8, 3, 2, 2, 4, 9, 5, 4, 3]));
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
