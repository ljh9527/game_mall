/**
 * 全局config配置
 *
 */

// const env = process.env.REACT_APP_ENV;

const requestUrlData = {
  development: 'http://localhost:9000',
};

export const requestUrl = requestUrlData.development;
// export const requestUrl = requestUrlData[process.env.REACT_APP_ENV];
