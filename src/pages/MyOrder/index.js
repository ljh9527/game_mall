import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import services from '../../services';
import { Button, Empty } from 'antd';
import { GameListItem,Title } from '../../components';
// import { getUrlParam } from '../../utils';
import style from './index.module.scss';

const MyOrder = (props) => {
  const { history, userInfo, getUserInfo } = props;
  const email = localStorage.getItem("EMAIL");
  const [avatar, setAvater] = useState();
  const [orderData, setOrderData] = useState([]);


  useEffect(() => {
    getUserInfo({ email });
    getOrderList({ email });
  }, []);
  useEffect(() => {
    setAvater(userInfo.avatar);
  }, [userInfo]);
  const handleBack = () => {
    history.push('/myGame/index');
  };

  const getOrderList = async (email) => {
    try {
      // 发送请求
      const { data } = await services.getOrderList(email);
      if (data.code === 200) {

        let newData = [];
        let newObj = {};

        let newOrderRule = [];
        data.data.forEach((item, index) => {

          let gameObj = {};
          let newItem = {};
          gameObj.game_name = item.game_name;
          gameObj.game_price = item.game_price;
          gameObj.gameid = item.gameid;
          gameObj.banner_img = item.banner_img;
          gameObj.subtitle = item.subtitle;
          gameObj.issueddate = item.issueddate;

          newItem.out_trade_no = item.out_trade_no;
          newItem.total_amount = item.total_amount;
          newItem.gamelist = [];

          newItem.gamelist.push(gameObj);
          newOrderRule.push(newItem);

        });

        newOrderRule.forEach((el, i) => {
          if (!newObj[el.out_trade_no]) {
            newData.push(el);
            newObj[el.out_trade_no] = true;
          } else {
            newData.forEach(el => {
              if (el.out_trade_no === newOrderRule[i].out_trade_no) {
                // el.gamelist = el.gamelist.concat(newOrderRule[i].gamelist);
                el.gamelist = [...el.gamelist, ...newOrderRule[i].gamelist]; // es6语法
              }
            })
          }
        })
        setOrderData(newData);

      }
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <div className={style.wrap}>
      <div className={style.background}>
        <div className={style.avatar}>
          <img src={avatar} alt='头像' />
        </div>
        <div className={style.cover}>
          <div className={style.userName}>
            <div className={style.name}>
              {userInfo.nickname}
            </div>
            <div className={style.introduction}>
              {userInfo.introduction}
            </div>
          </div>
          <div className={style.buttonBox}>
            <Button type="ghost" shape='round' size='small' onClick={handleBack}>返回主页</Button>
          </div>
        </div>
      </div>
      <div className={style.orderBox}>
        <Title data="我的订单"/>
        {
          orderData.length > 0 ? orderData.map((item, index) => (
            <div className={style.orderItem} key={index}>
              <div className={style.title}>
                <div className={style.trade_no}>
                  <span className={style.lable}>
                    订单号：
                  </span>
                  <span className={style.number}>
                    {item.out_trade_no}
                  </span>
                </div>
                <div className={style.all_price}>
                  <span className={style.lable}>
                    总金额：
                  </span>
                  <span className={style.number}>
                    {item.total_amount}
                  </span>
                </div>
              </div>
              <div className={style.gameBox}>
                <div className={style.lable}>
                  游戏列表：
                </div>
                <div className={style.gamelist}>
                  {
                    item.gamelist.map((item, index) => (
                      <GameListItem item={item} key={item + index} />
                    ))
                  }
                </div>
              </div>
            </div>
          )) : (
              <Empty></Empty>
            )
        }
      </div>
    </div>
  );
};

const mapStateToProps = ({ user }) => {
  return {
    userInfo: user.userInfo
  };
};

const mapDispathToProps = ({ user }) => {
  return {
    getUserInfo: user.getUserInfo
  };
};
export default connect(mapStateToProps, mapDispathToProps)(MyOrder);