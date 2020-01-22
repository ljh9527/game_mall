import React from 'react';
import { Icon } from 'antd';
import style from './index.module.scss';

const LoginHeader = (props) => {
  const { history, isLoginPage } = props;
  const handleBackLogin = () => {
    history.push('/');
  }
  return (
    <div className={style.wrap}>
      <div className={style.loginHeaderBox}>
        <div className={style.backWarper}>
          {
            isLoginPage ? (<></>) : (
              <div className={style.back} onClick={handleBackLogin}>
                <Icon type="left" />
              </div>)
          }
          <span className={style.title}>
            游戏商城
        </span>
        </div>
      </div>
      <div>
        {props.children}
      </div>
    </div>
  )
};

export default LoginHeader;