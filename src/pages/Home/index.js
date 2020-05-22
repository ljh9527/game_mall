import React, { useState, useEffect, } from 'react';
import services from '../../services';
import Rotation from './components/Rotation';
import Title from "./components/Title";
import Nav from '../../components/ui/Nav';
import Recommend from "./components/Recommend";
import { PrePurchaseBig, PrePurchaseNormal } from "./components/PrePurchase";
// import Masterpiece from "./components/Masterpiece";
import style from './index.module.scss';


const Home = (props) => {
  const { history } = props;
  const [rotationData, setRotationData] = useState();
  const [recommendData, setRecommendData] = useState();
  const [prePurchaseData, setPrePurchaseData] = useState();
  const [sellWellData, setsellWellData] = useState();
  useEffect(() => {
    getGameData(1);
    getGameData(2);
    getGameData(3);
    getGameData(4);
  }, [])
  // 请求轮播图数据
  const getGameData = async (type) => {
    // 发送请求
    try {
      // 发送请求
      const { data } = await services.getIndexGameList({ type });
      if (data.code === 200) {
        if (type === 1) {
          setRotationData(data.data);
        } else if (type === 2) {
          setRecommendData(data.data)
        } else if (type === 3) {
          setsellWellData(data.data)
        } else if (type === 4) {
          setPrePurchaseData(data.data)
        }
      }
    } catch (error) {
      console.log(error);
    }
  };
  // 前往详情
  const handleToDetail = (id) => {
    console.log(id);
    console.log('详情');
    history.push(`/game/details?id=${id}`);
  };
  // 前往列表
  const handleToMore = (searchTag) => {
    history.push(`/game/list?searchTag=${searchTag}`);
    console.log(searchTag);
  };
  return (
    <>
      <Nav history={history} />
      <div className={style.wrap}>
        <div className={style.rotation}>
          <Rotation rotationData={rotationData} handleToDetail={handleToDetail} />
        </div>
        <div className={style.recommend}>
          <Title name='热门推荐' searchTag='recommend' handleToMore={(name) => handleToMore(name)} />
          {
            recommendData && recommendData.map((item, index) => (
              <Recommend data={item} handleToDetail={handleToDetail} key={item + index} />
            ))
          }
        </div>
        <div className={style.prePurchase}>
          <Title name='本周热销' searchTag='sellWell' handleToMore={(name) => handleToMore(name)} />
          {
            sellWellData && sellWellData.map((item, index) => (
              <Recommend data={item} handleToDetail={handleToDetail} key={item + index} />
            ))
          }
        </div>
        <div className={style.prePurchase}>
          <Title name='火爆新品' searchTag='prePurchase' handleToMore={(name) => handleToMore(name)} />
          {
            prePurchaseData && prePurchaseData.map((item, index) => {
              if (index === 0) {
                return (<PrePurchaseBig data={item} handleToDetail={handleToDetail} key={item + index} />);
              } else {
                return (<PrePurchaseNormal data={item} handleToDetail={handleToDetail} key={item + index} />)
              }
            })
          }
        </div>
      </div>
    </>
  );
};

export default Home;