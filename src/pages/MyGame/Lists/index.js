import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import service from '../../../services';
import { Form, Button, Input, Icon } from 'antd';
import Game from './components/MyGame';
import Progress from './components/Progress';
import Evaluation from './components/Evaluation';
import style from './index.module.scss';

// const imgUrl = 'http://www.gravatar.com/avatar/5de1db3c896e5fdd7833c2c5d255783a?s=46&d=identicon';
const Details = (props) => {
  const { userInfo, getUserInfo, history, myGameList , getMyGameList } = props;
  const [activeIndex, setActiveIndex] = useState(false);
  const [avatar, setAvater] = useState();
  // const [gameList, setGameList] = useState();

  useEffect(() => {
    const email = localStorage.getItem("EMAIL");
    getMyGameList({email});
    getUserInfo({ email });
    setAvater(userInfo.avatar);
  }, []);
  useEffect(() => {
    setAvater(userInfo.avatar);
  }, [userInfo]);
  
  const handleEdit = () => {
    history.push('/myGame/edit');
  };
  const handleEvaluation = () => {
    setActiveIndex(!activeIndex);
  };
  const handleBack = () => {
    setActiveIndex(!activeIndex);
  };
  return (
    <div className={style.wrap}>
      <div className={style.background}>
        <div className={style.avatar}>
          <img src={avatar} alt='头像' />
        </div>
        <div className={style.cover}>
          <div className={style.userName}>
            {userInfo.nickname}
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
            <div className={style.game}>
              {
                myGameList && myGameList.map((item, index) => (
                  <Game data={item} key={item + index} history={history} />
                ))
              }
            </div>
            <div className={style.progress}>
              <Progress userInfo={userInfo}/>
            </div>
          </div>) : (<Evaluation />)
        }
      </div>
    </div>
  );
};

const mapStateToProps = ({ user,usergame }) => {
  return {
    userInfo: user.userInfo,
    myGameList: usergame.myGameList
  };
};

const mapDispathToProps = ({ user,usergame }) => {
  return {
    getUserInfo: user.getUserInfo,
    getMyGameList: usergame.getMyGameList
  };
};
export default connect(mapStateToProps, mapDispathToProps)(Form.create({ name: 'Info' })(Details));