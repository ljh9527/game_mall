import React, { useState, useEffect, } from 'react';
import services from '../../services';
import Rotation from './components/Rotation';
import Title from "./components/Title";
import Nav from '../../components/ui/Nav';
import Recommend from "./components/Recommend";
import { PrePurchaseBig, PrePurchaseNormal } from "./components/PrePurchase";
import Masterpiece from "./components/Masterpiece";
import style from './index.module.scss';

// const recommendData = [{
//   url: 'https://shop.3dmgame.com/upload/ico/2019/0711/1562820172245302.jpg',
//   name: '全面战争三国/Total War: THREE KINGDOMS',
//   time: '发售时间：2019-05-23',
//   price: '228.00',
//   oldPrice: '268.00',
// }, {
//   url: 'https://shop.3dmgame.com/upload/ico/2019/0711/1562820172245302.jpg',
//   name: '全面战争三国/Total War: THREE KINGDOMS',
//   time: '发售时间：2019-05-23',
//   price: '228.00',
//   oldPrice: '268.00',
// }, {
//   url: 'https://shop.3dmgame.com/upload/ico/2019/0711/1562820172245302.jpg',
//   name: '全面战争三国/Total War: THREE KINGDOMS',
//   time: '发售时间：2019-05-23',
//   price: '228.00',
//   oldPrice: '268.00',
// }, {
//   url: 'https://shop.3dmgame.com/upload/ico/2019/0711/1562820172245302.jpg',
//   name: '全面战争三国/Total War: THREE KINGDOMS',
//   time: '发售时间：2019-05-23',
//   price: '228.00',
//   oldPrice: '268.00',
// }];
// const PrePurchaseData = [{
//   url: 'https://shop.3dmgame.com/upload/ico/2019/0711/1562820172245302.jpg',
//   name: '全面战争三国/Total War: THREE KINGDOMS',
//   time: '发售时间：2019-05-23',
//   price: '228.00',
//   oldPrice: '268.00',
// }, {
//   url: 'https://shop.3dmgame.com/upload/ico/2019/0711/1562820172245302.jpg',
//   name: '全面战争三国/Total War: THREE KINGDOMS',
//   time: '发售时间：2019-05-23',
//   price: '228.00',
//   oldPrice: '268.00',
// }, {
//   url: 'https://shop.3dmgame.com/upload/ico/2019/0711/1562820172245302.jpg',
//   name: '全面战争三国/Total War: THREE KINGDOMS',
//   time: '发售时间：2019-05-23',
//   price: '228.00',
//   oldPrice: '268.00',
// }];
// const masterpieceData = [{
//   url: 'https://shop.3dmgame.com/upload/ico/2019/0711/1562820172245302.jpg',
//   name: '全面战争三国/Total War: THREE KINGDOMS',
//   time: '发售时间：2019-05-23',
//   price: '228.00',
//   oldPrice: '268.00',
// }, {
//   url: 'https://shop.3dmgame.com/upload/ico/2019/0711/1562820172245302.jpg',
//   name: '全面战争三国/Total War: THREE KINGDOMS',
//   time: '发售时间：2019-05-23',
//   price: '228.00',
//   oldPrice: '268.00',
// }, {
//   url: 'https://shop.3dmgame.com/upload/ico/2019/0711/1562820172245302.jpg',
//   name: '全面战争三国/Total War: THREE KINGDOMS',
//   time: '发售时间：2019-05-23',
//   price: '228.00',
//   oldPrice: '268.00',
// }, {
//   url: 'https://shop.3dmgame.com/upload/ico/2019/0711/1562820172245302.jpg',
//   name: '全面战争三国/Total War: THREE KINGDOMS',
//   time: '发售时间：2019-05-23',
//   price: '228.00',
//   oldPrice: '268.00',
// }];

const Home = (props) => {
  const { history } = props;
  const [rotationData, setRotationData] = useState();
  const [recommendData, setRecommendData] = useState();
  const [prePurchaseData, setPrePurchaseData] = useState();
  const [masterpieceData, setMasterpieceData] = useState();
  useEffect(() => {
    getGameData(1);
    getGameData(2);
    getGameData(3);
    // getGameData(4);
  }, [])
  // 请求轮播图数据
  const getGameData = async (type) => {
    // 发送请求
    try {
      // 发送请求
      const { data } = await services.getIndexGameData({ type });
      if (data.code === 200) {
        if (type === 1) {
          setRotationData(data.data);
        } else if (type === 2) {
          setRecommendData(data.data)
        } else if (type === 3) {
          setPrePurchaseData(data.data)
        } else if (type === 4) {
          setMasterpieceData(data.data)
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
  // 前往购买
  const handleBuy = (e) => {
    console.log('买');
    e.stopPropagation();
    e.cancelBubble = true;
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
              <Recommend data={item} handleToDetail={handleToDetail} handleBuy={handleBuy} key={item + index} />
            ))
          }
        </div>
        <div className={style.prePurchase}>
          <Title name='火爆新品' searchTag='prePurchase' handleToMore={(name) => handleToMore(name)} />
          {
            prePurchaseData && prePurchaseData.map((item, index) => {
              if (index === 0) {
                return (<PrePurchaseBig data={item} handleToDetail={handleToDetail} handleBuy={handleBuy} key={item + index} />);
              } else {
                return (<PrePurchaseNormal data={item} handleToDetail={handleToDetail} handleBuy={handleBuy} key={item + index} />)
              }
            })
          }
        </div>
        <div className={style.masterpiece}>
          <Title name='大型网游' searchTag='masterpiece' handleToMore={(name) => handleToMore(name)} />
          {
            masterpieceData && masterpieceData.map((item, index) => {
              if (index === 0 || index === 3) {
                return (<PrePurchaseBig data={item} handleToDetail={handleToDetail} handleBuy={handleBuy} key={item + index} />);
              } else {
                return (<PrePurchaseNormal data={item} handleToDetail={handleToDetail} handleBuy={handleBuy} key={item + index} />)
              }
            })
          }
        </div>
      </div>
    </>
  );
};

export default Home;