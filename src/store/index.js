/**
 * store主入口主要处理store的全局配置及输出store
 *
 * */

import { init } from '@rematch/core';
// import { isDev } from '-/config';
import models from './models';
import createLoadingPlugin from '@rematch/loading';

// Options 设置请参考
// https://github.com/rematch/rematch/blob/master/plugins/loading/README.md#options
const loadingPlugin = createLoadingPlugin({});

const store = init({
  models,
  plugins: [loadingPlugin],
});

// if (isDev) {
  // store.subscribe(() => console.log(store.getState()));
//   store.subscribe(() => {});
// }

export default store;
