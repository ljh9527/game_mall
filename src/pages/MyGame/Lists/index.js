import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import services from '../../../services';
import { Form, Button } from 'antd';
import Game from './components/MyGame';
import Progress from './components/Progress';
// import Evaluation from './components/Evaluation';
import { Title } from '../../../components';
import style from './index.module.scss';
import { requestErrorHandler } from '../../../utils';

const Details = (props) => {
  const { userInfo, getUserInfo, history, myBuyGameList, myDowloadGameList, getMyGameList } = props;
  const email = localStorage.getItem("EMAIL");
  const [avatar, setAvater] = useState();
  // const [gameList, setGameList] = useState();

  useEffect(() => {
    getMyGameList({ email, status: 0 });
    getMyGameList({ email, status: 1 });
    getUserInfo({ email });
    setAvater(userInfo.avatar);
  }, []);
  useEffect(() => {
    setAvater(userInfo.avatar);
  }, [userInfo]);

  const handleEdit = () => {
    history.push('/myGame/edit');
  };

  const onstart = async (id) => {
    const params = {
      email: email,
      gameid: id,
      // lastplay: time,
    }
    try {
      // 发送请求
      await services.updateOpenTime(params);
      // if (data.code === 200) {
      //   getMyGameList({ email });
      // }
    } catch (error) {
      requestErrorHandler(error);
    }
  }
  const updateStatus = async (id) => {
    const params = {
      gameid: id,
      email: email,
      status: "1"
    }
    try {
      // 发送请求
      const { data } = await services.updateStatus(params);
      if (data.code === 200) {
        getMyGameList({ email, status: 0 });
        getMyGameList({ email, status: 1 });
      }
    } catch (error) {
      requestErrorHandler(error);
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
            <Button type="ghost" shape='round' size='small' onClick={handleEdit}>编辑资料</Button>
          </div>
        </div>
      </div>
      <div className={style.content}>
        <div className={style.con}>
          <div className={style.gameBox}>
            <Title data="我的下载" />
            <div className={style.game}>
              {
                myDowloadGameList && myDowloadGameList.map((item, index) => (
                  <Game data={item} key={item + index} onstart={onstart} history={history} status={1} />
                ))
              }
            </div>
            <Title data="我的购买" />
            <div className={style.game}>
              {
                myBuyGameList && myBuyGameList.map((item, index) => (
                  <Game data={item} key={item + index} onstart={onstart} history={history} status={0} updateStatus={(id) => updateStatus(id)} />
                ))
              }
            </div>
          </div>
          <div className={style.progress}>
            <Progress userInfo={userInfo} />
          </div>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = ({ user, usergame }) => {
  return {
    userInfo: user.userInfo,
    myBuyGameList: usergame.myBuyGameList,
    myDowloadGameList: usergame.myDowloadGameList
  };
};

const mapDispathToProps = ({ user, usergame }) => {
  return {
    getUserInfo: user.getUserInfo,
    getMyGameList: usergame.getMyGameList
  };
};
export default connect(mapStateToProps, mapDispathToProps)(Form.create({ name: 'Info' })(Details));