import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { message } from 'antd';
import services from '../../services';
import classnames from 'classnames';
import Introduce from './Introduce';
import Info from './Info';
import Comment from './Comment';
import style from './index.module.scss';
import { getUrlParam, requestErrorHandler } from '../../utils';

const Details = (props) => {
  const { history, setDownloadList, setPercentComplete } = props;
  const email = localStorage.getItem("EMAIL");
  const [id] = useState(getUrlParam('id'));
  const [activeIndex, setActiveIndex] = useState(0);
  const [gameInfo, setGameInfo] = useState();
  
  const download = (name, url, id) => {
    console.log('id', id);
    console.log('id', url);
    let xhr = new XMLHttpRequest();
    const downloadUrl = url;
    xhr.open('GET', downloadUrl, true);
    xhr.responseType = 'blob';
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
        // if (percentComplete === 1) {
        //   addGame(id);
        // }
      }
    }, false);
    xhr.onreadystatechange = function () {  //同步的请求无需onreadystatechange      
      if (xhr.readyState === 4 && xhr.status === 200) {
        var filename = `${name}.exe`;
        var link = document.createElement('a');
        link.href = window.URL.createObjectURL(xhr.response);
        link.download = filename;
        link.click();
        addGame(id);
      }
    };
    xhr.send();
  }
  const data = [{
    name: '游戏介绍',
    component: <Introduce gameInfo={gameInfo} download={download} history={history} />
  }, {
    name: '游戏详情',
    component: <Info gameInfo={gameInfo} />
  }, {
    name: '用户评测',
    component: <Comment gameInfo={gameInfo} />
  }];

  useEffect(() => {
    getGameInfo(id);
  }, [id])
  const handleClick = (index) => {
    setActiveIndex(index);
  };
  // 回到上一页
  const goBack = () => {
    history.goBack();
  };
  // 添加游戏数据
  const addGame = async (id) => {
    const param = {
      gameid: (id).toString(),
      email: email,
      status: '1',
      address: "E:\\Microsoft VS Code\\Code.exe",
    };
    // 发送请求
    try {
      // 发送请求
      const { data } = await services.addMyGame(param);
      if (data.code === 200) {
        message.success("下载成功");
      } else {
      }
    } catch (error) {
      requestErrorHandler(error);
    }
  };

  // 请求游戏数据
  const getGameInfo = async (id) => {
    // 发送请求
    try {
      // 发送请求
      const { data } = await services.getGameInfo({ id });
      if (data.code === 200) {
        setGameInfo(data.data[0]);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className={style.wrap}>
      <header className={style.header}>
        <div className={style.crumb}>
          <span className={style.inner}>
            <span>
              <span className={style.center} onClick={goBack} >{'精选 >'} </span>
              <span>{gameInfo && gameInfo[0].gameName}</span>
            </span>
            <span className={style.border}></span>
          </span>
        </div>
        <div className={style.detail_banner}>
          <img src="https://wegame.gtimg.com/g.2001097-r.488f0/info/caddcdd4d5241e50e085e0d84666721b.jpg" alt='bg' />
        </div>
        <div className={style.headinfo}>
          <div className={style.img}>
            <img src={gameInfo && gameInfo[1].imageCover} alt={gameInfo && gameInfo[0].gameName} />
          </div>
          <div className={style.introduce}>
            <div className={style.name}>
              <h1 title={gameInfo && gameInfo[0].gameName}>{gameInfo && gameInfo[0].gameName}</h1>
            </div>
          </div>
        </div>
        <div className={style.navwrap}>
          <div className={style.nav}>
            {
              data.map((item, index) => (
                <div
                  className={classnames({ [style.item]: true, [style.bottom]: index === activeIndex })}
                  key={index}
                  onClick={() => handleClick(index)}
                >
                  {item.name}
                </div>
              ))
            }
          </div>
        </div>
      </header>
      <div className={style.detail}>
        {
          (data[activeIndex].component)
        }
      </div>
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
export default connect(mapStateToProps, mapDispathToProps)(Details);