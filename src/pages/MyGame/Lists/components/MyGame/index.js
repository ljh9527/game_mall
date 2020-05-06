import React from 'react';
import { connect } from 'react-redux';
import style from './index.module.scss'

const Game = (props) => {
  const { data, history, onstart, status, updateStatus,setDownloadList } = props;

  const handleToDetail = (id) => {
    history.push(`/myGame/details?id=${id}`);
  };
  const handleToStart = (name, id) => {
    let xhr = new XMLHttpRequest();
    const downloadUrl = 'https://gw.alipayobjects.com/os/bmw-prod/4e2a3716-d106-4819-81b8-920d61cb13fe.exe';
    xhr.open('GET', downloadUrl, true);
    xhr.addEventListener('progress', function (event) {
      // 响应头要有Content-Length
      if (event.lengthComputable) {
        let percentComplete = event.loaded / event.total;
        const item = {
          id: id,
          name: name,
          percentComplete: percentComplete
        }
        setDownloadList(item);
        if (percentComplete === 1) {
          updateStatus(id);
        }
      }
    }, false);
    xhr.send();
  };

  return (
    <div className={style.wrap}>
      <div className={style.imgBox} onClick={() => handleToDetail(data.id)}>
        <img src={data.image_cover} alt={data.game_name} />
      </div>
      {/* <div className={style.bottom} onClick={() => handleToDetail(data.id)}>
        <div className={style.name}>{data.game_name}</div>
        <div className={style.lastTime}>上次登录{data.lastplay}</div>
        <div className={style.totalTime}>已玩{data.playtime}小时</div>
      </div> */}
      {
        status == 1 ? (<div className={style.button} onClick={() => handleToDetail(data.id)}>游戏详情</div>)
          : (<div className={style.button} onClick={() => handleToStart(data.game_name,data.id)}>下载游戏</div>)
      }
    </div>
  );
};

const mapStateToProps = ({ download }) => {
  return {
  };
};

const mapDispathToProps = ({ download }) => {
  return {
    setPercentComplete: download.setPercentComplete,
    setGame: download.setGame,
    setDownloadList: download.setDownloadList
  };
};
export default connect(mapStateToProps, mapDispathToProps)(Game);