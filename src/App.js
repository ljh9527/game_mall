import React from 'react';
import { Provider } from 'react-redux';
import store from './store';
import Router from './routers';
// import '-/utils/rem';
import { ConfigProvider } from 'antd';
import zhCN from 'antd/lib/locale-provider/zh_CN';
import moment from 'moment';
import 'moment/locale/zh-cn';

moment.locale('zh-cn');

function App() {
  return (
    <div className="app">
      <ConfigProvider locale={zhCN}>
        <Provider store={store}>
          <Router />
        </Provider>
      </ConfigProvider>
    </div>
  );
}

export default App;
