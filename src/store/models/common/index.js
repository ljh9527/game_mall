/**
* common state 主要处理store中公共的数据
* */
// import { collection as ctServices } from '-/services';
// import { requestErrorHandler } from '-/utils';
// import { urlToStore } from '-/config/pathMappingStore.js';
// import { USERNAME } from '-/constants';
const common = {
  state: {
    userInfo: {
      userName: (
        () => {
          return localStorage.getItem('username') || '未登录';
        }
      )(),
    },
  },
  reducers: {
    setState(state, paylod) {
      return { ...state, ...paylod };
    },
  },
  effects: (dispath) => ({
    
  }),
};

export default common;
