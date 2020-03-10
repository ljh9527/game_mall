import React from 'react';
import Rotation from './components/Rotation';
import Title from "./components/title";
import Recommend from "./components/Recommend";
import { PrePurchaseBig, PrePurchaseNormal } from "./components/PrePurchase";
import style from './index.module.scss';

const recommendData = [{
  url: 'https://shop.3dmgame.com/upload/ico/2019/0711/1562820172245302.jpg',
  name: '全面战争三国/Total War: THREE KINGDOMS',
  time: '发售时间：2019-05-23',
  price: '228.00',
  oldPrice: '268.00',
}, {
  url: 'https://shop.3dmgame.com/upload/ico/2019/0711/1562820172245302.jpg',
  name: '全面战争三国/Total War: THREE KINGDOMS',
  time: '发售时间：2019-05-23',
  price: '228.00',
  oldPrice: '268.00',
}, {
  url: 'https://shop.3dmgame.com/upload/ico/2019/0711/1562820172245302.jpg',
  name: '全面战争三国/Total War: THREE KINGDOMS',
  time: '发售时间：2019-05-23',
  price: '228.00',
  oldPrice: '268.00',
}, {
  url: 'https://shop.3dmgame.com/upload/ico/2019/0711/1562820172245302.jpg',
  name: '全面战争三国/Total War: THREE KINGDOMS',
  time: '发售时间：2019-05-23',
  price: '228.00',
  oldPrice: '268.00',
}];
const PrePurchaseBigData = [{
  url: 'https://shop.3dmgame.com/upload/ico/2019/0711/1562820172245302.jpg',
  name: '全面战争三国/Total War: THREE KINGDOMS',
  time: '发售时间：2019-05-23',
  price: '228.00',
  oldPrice: '268.00',
}];
const PrePurchaseNormalData = [{
  url: 'https://shop.3dmgame.com/upload/ico/2019/0711/1562820172245302.jpg',
  name: '全面战争三国/Total War: THREE KINGDOMS',
  time: '发售时间：2019-05-23',
  price: '228.00',
  oldPrice: '268.00',
}, {
  url: 'https://shop.3dmgame.com/upload/ico/2019/0711/1562820172245302.jpg',
  name: '全面战争三国/Total War: THREE KINGDOMS',
  time: '发售时间：2019-05-23',
  price: '228.00',
  oldPrice: '268.00',
}];

const Home = (props) => {
  console.log(PrePurchaseBig);
  // 前往详情
  const handleToDetail = (e) => {
    console.log('详情');
  }
  // 前往购买
  const handleBuy = (e) => {
    console.log('买');
    e.stopPropagation();
    e.cancelBubble = true;
  }
  return (
    <div className={style.wrap}>
      <div className={style.rotation}>
        <Rotation />
      </div>
      <div className={style.recommend}>
        <Title name='热门推荐' />
        {
          recommendData.map((item, index) => (
            <Recommend data={item} handleToDetail={handleToDetail} handleBuy={handleBuy} key={item+index}/>
          ))
        }
      </div>
      <div className={style.prePurchase}>
        <Title name='预购游戏' />
        {
          PrePurchaseBigData.map((item, index) => (
            <PrePurchaseBig data={item} handleToDetail={handleToDetail} handleBuy={handleBuy} />
          ))
        }
      </div>
      <div className={style.first}>第四部分</div>
    </div>
  );
};

export default Home;