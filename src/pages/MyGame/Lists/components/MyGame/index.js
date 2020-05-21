import React from 'react';
import { message } from 'antd';
import { connect } from 'react-redux';
import style from './index.module.scss'

const { ipcRenderer } = window.electron;
const Game = (props) => {
  const { data, history, onstart, status, updateStatus, setDownloadList, setPercentComplete } = props;

  const handleToDetail = (id) => {
    history.push(`/myGame/details?id=${id}`);
  };
  const handleToDownload = (name, download , id) => {
    let xhr = new XMLHttpRequest();
    const downloadUrl = download;
    xhr.open('GET', downloadUrl, true);
    xhr.responseType = "blob";
    message.info("正在下载，右上角可查看进度！");
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
        setPercentComplete(percentComplete);
        if (percentComplete === 1) {
          updateStatus(id);
        }
      }
    }, false);
    xhr.onreadystatechange = function () {  //同步的请求无需onreadystatechange      
      if (xhr.readyState === 4 && xhr.status === 200) {
        var filename = `${name}.exe`;
        var link = document.createElement('a');
        link.href = window.URL.createObjectURL(xhr.response);
        link.download = filename;
        link.click();
      }
    };
    xhr.send();
  };
  const handleToStart = (id) => {
    ipcRenderer.send("open-child", "F:\\vscode\\Microsoft VS Code\\Code.exe");
    onstart(id);
  }

  return (
    <div className={style.wrap}>
      <div className={style.imgBox} onClick={() => handleToDetail(data.id)}>
        <img src={data.image_cover} alt={data.game_name} />
      </div>
      {
        status == 1 ? (<div className={style.bottom} onClick={() => handleToDetail(data.id)}>
          <div className={style.name}>{data.game_name}</div>
          <div className={style.lastTime}>上次登录{data.lastplay}</div>
          {/* <div className={style.totalTime}>已玩{data.playtime}小时</div> */}
        </div>)
          : (<></>)
      }
      {
        status == 1 ? (<div className={style.button} onClick={() => handleToStart(data.id)}>立即启动</div>)
          : (<div className={style.button} onClick={() => handleToDownload(data.game_name, data.id)}>下载游戏</div>)
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
    setDownloadList: download.setDownloadList,
  };
};
export default connect(mapStateToProps, mapDispathToProps)(Game);