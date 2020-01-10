import React from 'react';
import { Header } from '-/components';
import { menus } from './config';

// // 扁平化数组
// const recursiveFunc = (list) => {
//   let array = [];
//   for (const item of list) {
//     const json = { ...item };
//     if (item.children) {
//       delete json.children;
//     }

//     array.push(json);
//     if (item.children && item.children.length) {
//       array = [].concat(array, recursiveFunc(item.children));
//     }
//   }
//   return array;
// };

// const menusNew = recursiveFunc(menus);

const Home = (props) => {
  return (
    <>
      <Header/>
      {props.children}
    </>
  );
};

export default Home;