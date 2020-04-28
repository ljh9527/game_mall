import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import services from '../../../services';
import { Form, Button } from 'antd';
import Game from './components/MyGame';
import Progress from './components/Progress';
import Evaluation from './components/Evaluation';
import { Title } from '../../../components';
import style from './index.module.scss';

// const imgUrl = 'http://www.gravatar.com/avatar/5de1db3c896e5fdd7833c2c5d255783a?s=46&d=identicon';
const Details = (props) => {
  const { userInfo, getUserInfo, history, myBuyGameList, myDowloadGameList, getMyGameList } = props;
  const email = localStorage.getItem("EMAIL");
  const [activeIndex, setActiveIndex] = useState(false);
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
  // const handleEvaluation = () => {
  //   setActiveIndex(!activeIndex);
  // };
  // const handleBack = () => {
  //   setActiveIndex(!activeIndex);
  // };
  const onstart = async (id) => {
    // let time = new Date().getTime();
    console.log(id);
    // console.log(time);
    const params = {
      email: email,
      gameid: id,
      // lastplay: time,
    }
    try {
      // 发送请求
      const { data } = await services.updateOpenTime(params);
      if (data.code === 200) {
        getMyGameList({ email });
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
            <Button type="ghost" shape='round' size='small' onClick={handleEdit}>编辑资料</Button>
            {/* {
              !activeIndex ? (<Button type="ghost" shape='round' size='small' onClick={handleEvaluation}>查看评测</Button>) 
              : (<Button type="ghost" shape='round' size='small' onClick={handleBack} en>返回主页</Button>)
            } */}
          </div>
        </div>
      </div>
      <div className={style.content}>
        {
          !activeIndex ? (<div className={style.con}>
            <div className={style.gameBox}>
              <Title data="我的下载"/>
              <div className={style.game}>
                {
                  myDowloadGameList && myDowloadGameList.map((item, index) => (
                    <Game data={item} key={item + index} onstart={onstart} history={history} status={1}/>
                  ))
                }
              </div>
              <Title data="我的购买"/>
              <div className={style.game}>
                {
                  myBuyGameList && myBuyGameList.map((item, index) => (
                    <Game data={item} key={item + index} onstart={onstart} history={history} status={0}/>
                  ))
                }
              </div>
            </div>
            <div className={style.progress}>
              <Progress userInfo={userInfo} />
            </div>
          </div>) : (<Evaluation />)
        }
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