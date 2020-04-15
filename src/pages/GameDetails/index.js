import React, { useState, useEffect } from 'react';
import services from '../../services';
import classnames from 'classnames';
import Introduce from './Introduce';
import Info from './Info';
import Comment from './Comment';
import style from './index.module.scss';
import { getUrlParam } from '../../utils';

const Details = (props) => {
  const [id] = useState(getUrlParam('id'));
  const [activeIndex, setActiveIndex] = useState(0);
  const [gameInfo, setGameInfo] = useState();
  const download = (id)=>{
    console.log(id);
  }
  const data = [{
    name: '游戏介绍',
    component: <Introduce gameInfo={gameInfo} download={download} />
  }, {
    name: '游戏详情',
    component: <Info gameInfo={gameInfo} />
  }, {
    name: '用户评测',
    component: <Comment gameInfo={gameInfo} />
  },
    '应用特性'];
  // 前往购买
  // const handleBuy = (e) => {
  //   console.log('买');
  //   e.stopPropagation();
  //   e.cancelBubble = true;
  // }

  useEffect(()=>{
    getGameInfo(id);
  }, [id])
  const handleClick = (index) => {
    setActiveIndex(index);
  };
  // 回到上一页
  const goBack = () => {

  };
  
  // 请求游戏数据
  const getGameInfo = async (id) => {
    // 发送请求
    try {
      // 发送请求
      const { data } = await services.getGameInfo({id});
      if(data.code === 200){
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
              <span>{gameInfo&&gameInfo[0].gameName}</span>
            </span>
            <span className={style.border}></span>
          </span>
        </div>
        <div className={style.detail_banner}>
          <img src="https://wegame.gtimg.com/g.2001097-r.488f0/info/caddcdd4d5241e50e085e0d84666721b.jpg" alt='bg' />
        </div>
        <div className={style.headinfo}>
          <div className={style.img}>
            <img src={gameInfo&&gameInfo[1].imageCover} alt={gameInfo&&gameInfo[0].gameName} />
          </div>
          <div className={style.introduce}>
            <div className={style.name}>
              <h1 title={gameInfo&&gameInfo[0].gameName}>{gameInfo&&gameInfo[0].gameName}</h1>
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

export default Details;