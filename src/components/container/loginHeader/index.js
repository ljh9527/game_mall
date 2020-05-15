import React from 'react';
import { Icon } from 'antd';
import styles from './index.module.scss';

const { ipcRenderer } = window.electron;

const LoginHeader = (props) => {
  const { history, isLoginPage } = props;
  const handleBackLogin = () => {
    history.push('/');
  }
  const closeWindow = () => {
    window.close();
  };
  const minWindow = () => {
    ipcRenderer.send("min");
  };
  return (
    <div className={styles.wrap}>
      <div className={styles.loginHeaderBox}>
        <div className={styles.top}>
          <div className={styles.topRight}>
            <div className={styles.minus} onClick={minWindow}>
              <Icon type="minus"/>
            </div>
            <div className={styles.close} onClick={closeWindow}>
              <Icon type="close"/>
            </div>
          </div>
        </div>
        <div className={styles.backWarper}>
          {
            isLoginPage ? (<></>) : (
              <div className={styles.back} onClick={handleBackLogin}>
                <Icon type="left" />
              </div>)
          }
          <span className={styles.title}>
            FunGame
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