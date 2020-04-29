import React from 'react';
import { connect } from 'react-redux';
import { Icon, Progress } from 'antd';
import styles from './index.module.scss';
// const { ipcRenderer } = window.electron;

const Dowload = (props) => {
  const { percentComplete, game } = props;
console.log(percentComplete)
console.log(game)
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
      <div className={styles.item}>
        <div className={styles.name}>
          {game}
        </div>
        <div className={styles.progress}>
          <Progress percent={percentComplete*100} />
        </div>
      </div>
    </div>
  );
};


const mapStateToProps = ({ dowload }) => {
  return {
    percentComplete: dowload.percentComplete,
    game: dowload.game
  };
};

const mapDispathToProps = ({ dowload }) => {
  return {
    setPercentComplete: dowload.setPercentComplete,
    setGame: dowload.setGame
  };
};
export default connect(mapStateToProps, mapDispathToProps)(Dowload);