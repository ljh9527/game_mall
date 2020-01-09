/**
 * history构建
 * */

import * as History from 'history';

let history = History.createBrowserHistory();
// const push = history.push;
//
// history.beforePush = (path, state) => {
//   return path;
// };
//
// history.push = (path, state) => {
//   let search = history.beforePush(path, state);
//   push(search, state);
// };

export default history;
