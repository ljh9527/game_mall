import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import services from '../../../services';
import { Form, Button, Icon, Radio, Input } from 'antd';
import { getUrlParam } from '../../../utils';

import style from './index.module.scss';
const { TextArea } = Input;
// const imgUrl = 'http://www.gravatar.com/avatar/5de1db3c896e5fdd7833c2c5d255783a?s=46&d=identicon';
const Details = (props) => {
  const [id] = useState(getUrlParam('id'));
  const email = localStorage.getItem("EMAIL");
  const { userInfo, getUserInfo, myGameDetail, getMyGameDetail, history } = props;
  const [gameInfo, setGameInfo] = useState();
  const [userComment, setUserComment] = useState();
  const [avatar, setAvater] = useState();
  const [radio, setRadio] = useState();
  const [textarea, setTextarea] = useState();
  // const [gameList, setGameList] = useState();
  useEffect(() => {
    getUserInfo({ email });
    getGameInfo(id);
    getMyGameDetail({ email, gameid: id });
    getUserComment(email, id);
    // setAvater(userInfo.avatar);
  }, []);
  useEffect(() => {
    setAvater(userInfo.avatar);
  }, [userInfo]);
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
  // 请求游戏数据
  const getUserComment = async (email, gameid) => {
    // 发送请求
    try {
      // 发送请求
      const { data } = await services.getUserComment({ email, gameid });
      if (data.code === 200) {
        setUserComment(data.data);
      }
    } catch (error) {
      console.log(error);
    }
  };
  const handleDelete = async (id) => {
    try {
      // 发送请求
      const { data } = await services.deleteUserComment({ id });
      if (data.code === 200) {
        console.log("删除成功");
        setUserComment();
      }
    } catch (error) {
      console.log(error);
    }

  }
  const handleSaveComment = async () => {
    const params = {
      email: email,
      gameid: id,
      content: textarea,
      recommendstatu: radio,
      commentdate: new Date().getTime(),
    }
    try {
      // 发送请求
      const { data } = await services.addComment(params);
      if (data.code === 200) {
        getUserComment(email, id);
        handleCancleComment();
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleEdit = () => {
    history.push('/myGame/edit');
  };
  const handleBack = () => {
    history.push('/myGame/index');
  };
  const handleStart = (id) => {
    console.log(id);
  };
  const handleAdd = (id) => {
    console.log(id);
  }
  const handleRadioChange = (e) => {
    console.log(e.target.value);
    setRadio(e.target.value);
  }
  const handleTextAreaChange = ({ target: { value } }) => {
    console.log({ value });
    setTextarea(value);
  }
  const handleCancleComment = () => {
    setRadio();
    setTextarea();
  }
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
            <Button type="ghost" shape='round' size='small' onClick={handleBack}>返回主页</Button>
          </div>
        </div>
      </div>
      <div className={style.content}>
        <div className={style.gameinfo}>
          <div className={style.title_hd}>
            <span className={style.title_h1}>{gameInfo && gameInfo[0].gameName}</span>
          </div>
          <div className={style.waper}>
            <div className={style.gameimage}>
              <img src={gameInfo && gameInfo[1].imageCover} alt="cover" />
            </div>
            <div className={style.gametitle}>
              <div className={style.detail}>
                <div className={style.item}>
                  <span className={style.name}>游戏名</span>
                  <span className={style.value}>{gameInfo && gameInfo[0].gameName}</span>
                </div>
                <div className={style.item}>
                  <span className={style.name}>开发商</span>
                  <span className={style.value}>{gameInfo && gameInfo[0].developers}</span>
                </div>
                <div className={style.item}>
                  <span className={style.name}>运营商</span>
                  <span className={style.value}>{gameInfo && gameInfo[0].operator}</span>
                </div>
                <div className={style.introductionitem}>
                  <div className={style.name}>介绍</div>
                  <div className={style.introduction}>{gameInfo && gameInfo[0].gameIntroduction}</div>
                </div>
              </div>
            </div>
          </div>
          <div className={style.gamecoment}>
            <div className={style.title_hd}>
              <span className={style.title_h1}>{userComment ? '我的评测' : '添加评测'}</span>
            </div>
            {
              userComment ? (<div className={style.content}>
                <div className={style.contentbox}>
                  <div className={style.statusWaper}>
                    {
                      userComment.recommendstatu === 0 ? (
                        <>
                          <Icon type="smile" />
                          <div className={style.status}>推荐</div>
                        </>) : (
                          <>
                            <Icon type="frown" />
                            <div className={style.status}>不推荐</div>
                          </>
                        )
                    }
                  </div>
                  <div className={style.time}>{userComment.commentdate}</div>
                  <div className={style.con}>{userComment.content}</div>
                </div>
                <div className={style.btns}>
                  <Button type="ghost" shape='round' size='small' onClick={() => handleAdd(userComment.id)}>追加评测</Button>
                  <Button type="ghost" shape='round' size='small' onClick={() => handleDelete(userComment.id)}>删除此条</Button>
                </div>
              </div>) : (<div className={style.commentInput}>
                <div className={style.commenthead}>发表我的评测</div>
                <div className={style.radiobox}>
                  <Radio.Group onChange={(e) => handleRadioChange(e)} value={radio}>
                    <Radio value={0}>
                      <div className={style.status}>推荐</div>
                      <Icon type="smile" />
                    </Radio>
                    <Radio value={1}>
                      <div className={style.status}>不推荐</div>
                      <Icon type="frown" />
                    </Radio>
                  </Radio.Group>
                </div>
                <div className={style.textbox}>
                  <TextArea
                    value={textarea}
                    onChange={handleTextAreaChange}
                    placeholder="分享一下你的看法吧~"
                    autoSize={{ minRows: 3 }}
                  />
                </div>
                <div className={style.btns}>
                  <Button type="ghost" shape='round' size='small' onClick={() => handleSaveComment()}>保存评测</Button>
                  <Button type="ghost" shape='round' size='small' onClick={() => handleCancleComment()}>取消评测</Button>
                </div>
              </div>)
            }

          </div>
        </div>
        <div className={style.userinfo}>
          <div className={style.title_hd}>
            <span className={style.title_h1}>与我相关</span>
          </div>
          <div className={style.detail}>
            <div className={style.item}>
              <span className={style.name}>玩耍时长</span>
              <span className={style.value}>{myGameDetail.playtime}小时</span>
            </div>
            <div className={style.item}>
              <span className={style.name}>上次启动</span>
              <span className={style.value}>{moment(myGameDetail.lastplay).format('YYYY-MM-DD')}</span>
            </div>
          </div>
          <div className={style.button}>
            <Button type='primary' size='large' onClick={() => handleStart(myGameDetail.gameid)}>启动</Button>
          </div>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = ({ user, usergame }) => {
  return {
    userInfo: user.userInfo,
    myGameDetail: usergame.myGameDetail
  };
};

const mapDispathToProps = ({ user, usergame }) => {
  return {
    getUserInfo: user.getUserInfo,
    getMyGameDetail: usergame.getMyGameDetail
  };
};
export default connect(mapStateToProps, mapDispathToProps)(Form.create({ name: 'Info' })(Details));