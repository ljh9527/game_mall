import React from 'react';
import { Icon } from 'antd';
import styles from './index.module.scss';
// const { ipcRenderer } = window.electron;

const Details = (props) => {

  const closeWindow = () => {
    window.close();
  };

  return (
    <div className={styles.wrap}>
      <div className={styles.top}>
        <div className={styles.topLeft}>
          全速下载
          <Icon type="CaretDown" className={styles.close} />
        </div>
        <div className={styles.topRight}>
          <Icon type="close" className={styles.close} onClick={closeWindow} />
        </div>
      </div>
    </div>
  );
};

export default Details;