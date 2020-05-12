import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import services from '../../../services';
import { Form, Button, Icon, Radio, Input, message } from 'antd';
import { Title } from '../../../components';
import { getUrlParam } from '../../../utils';

import style from './index.module.scss';
const { TextArea } = Input;
const { ipcRenderer } = window.electron;

// const imgUrl = 'http://www.gravatar.com/avatar/5de1db3c896e5fdd7833c2c5d255783a?s=46&d=identicon';
const Details = (props) => {
  const [id] = useState(getUrlParam('id'));
  const email = localStorage.getItem("EMAIL");
  const { userInfo, getUserInfo, myGameDetail, getMyGameDetail, history, setPercentComplete, setDownloadList, setGame } = props;
  const [gameInfo, setGameInfo] = useState();
  const [userComment, setUserComment] = useState();
  const [avatar, setAvater] = useState();
  const [radio, setRadio] = useState();
  const [textarea, setTextarea] = useState();
  const [addStatus, setAddStatus] = useState(false);
  const [addtextarea, setAddtextarea] = useState();
  // const [gameList, setGameList] = useState();
  useEffect(() => {
    getUserInfo({ email });
    getGameInfo(id);
    getMyGameDetail({ email, gameid: id });
    getUserComment(email, id);
    // setAvater(userInfo.avatar);
  }, []);
  console.log(gameInfo);
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
    if (textarea !== undefined || radio !== undefined) {
      const params = {
        email: email,
        gameid: id,
        content: textarea,
        recommendstatu: radio
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
    } else {
      message.error("请先添加评测")
    }
  };
  const handleAppendComment = async () => {
    if (addtextarea !== undefined) {
      const params = {
        email: email,
        gameid: id,
        appendcontent: addtextarea,
      }
      try {
        // 发送请求
        const { data } = await services.appendComment(params);
        if (data.code === 200) {
          getUserComment(email, id);
          handleCancleComment();
        }
      } catch (error) {
        console.log(error);
      }
    } else {
      message.error("请先添加评测")
    }
  };

  const handleAppendChange = ({ target: { value } }) => {
    setAddtextarea(value);
  }
  const handleEdit = () => {
    history.push('/myGame/edit');
  };
  const handleBack = () => {
    history.push('/myGame/index');
  };
  const handleStart = (id) => {
    console.log(id);
    ipcRenderer.send("open-child", "F:\\vscode\\Microsoft VS Code\\Code.exe");
  };
  const handleRadioChange = (e) => {
    setRadio(e.target.value);
  }
  const handleTextAreaChange = ({ target: { value } }) => {
    setTextarea(value);
  }
  const handleCancleComment = () => {
    setRadio();
    setTextarea();
    setAddStatus(!addStatus);
  }
  const handleAdd = () => {
    setAddStatus(true);
  }
  const handleCancleAddComment = () => {
    setAddStatus(false);
  }
  const handleToDownload = (name, id) => {
    let xhr = new XMLHttpRequest();
    const downloadUrl = 'https://gw.alipayobjects.com/os/bmw-prod/4e2a3716-d106-4819-81b8-920d61cb13fe.exe';
    xhr.open('GET', downloadUrl, true);
    xhr.responseType = "blob";
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
        if (percentComplete === 1) {
          updateStatus(id);
        }
      }
    }, false);
    xhr.onreadystatechange = function () {  //同步的请求无需onreadystatechange      
      if (xhr.readyState === 4 && xhr.status === 200) {
        var filename = "test.exe";
        var link = document.createElement('a');
        link.href = window.URL.createObjectURL(xhr.response);
        link.download = filename;
        link.click();
      }
    };
    xhr.send();
  };
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
        getMyGameDetail({ email, gameid: id });
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
            <Button type="ghost" shape='round' size='small' onClick={handleBack}>返回主页</Button>
          </div>
        </div>
      </div>
      <div className={style.content}>
        <div className={style.gameinfo}>
          <Title data={gameInfo && gameInfo[0].gameName} />
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
            <Title data={userComment ? '我的评测' : '添加评测'} />
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
                  {
                    userComment.appendcontent && userComment.appenddate ? (
                      <>
                        <div className={style.time}>{userComment.appenddate}</div>
                        <div className={style.con}>{userComment.appendcontent}</div>
                      </>
                    ) : (<></>)
                  }
                </div>
                <div className={style.btns}>
                  {
                    userComment.appendcontent && userComment.appenddate ? (<></>)
                      : (<Button type="ghost" shape='round' size='small' onClick={() => handleAdd(userComment.id)}>追加评测</Button>)
                  }
                  <Button type="ghost" shape='round' size='small' onClick={() => handleDelete(userComment.id)}>删除此条</Button>
                </div>
                {
                  !addStatus ? (<></>) : (<div className={style.addcontentbox}>
                    <div className={style.textbox}>
                      <div className={style.commenthead}>添加追评</div>
                      <TextArea
                        value={addtextarea}
                        onChange={handleAppendChange}
                        placeholder="分享一下你的看法吧~"
                        autoSize={{ minRows: 3 }}
                      />
                    </div>
                    <div className={style.btns}>
                      <Button type="ghost" shape='round' size='small' onClick={() => handleAppendComment()}>保存追评</Button>
                      <Button type="ghost" shape='round' size='small' onClick={() => handleCancleAddComment()}>取消评测</Button>
                    </div>
                  </div>)
                }
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
          <Title data='与我相关' />
          {
            myGameDetail.status === 1 ? (
              <>
                <div className={style.detail}>
                  {/* <div className={style.item}>
                    <span className={style.name}>玩耍时长</span>
                    <span className={style.value}>{myGameDetail.playtime}小时</span>
                  </div> */}
                  <div className={style.item}>
                    <span className={style.name}>上次启动</span>
                    <span className={style.value}>{myGameDetail.lastplay !== null ? moment(myGameDetail.lastplay).format('YYYY-MM-DD') : "暂未玩耍"}</span>
                  </div>
                </div>
                <div className={style.button}>
                  <Button type='primary' size='large' onClick={() => handleStart(myGameDetail.gameid)}>启动</Button>
                </div>
              </>
            ) : (<>
              <div className={style.button}>
                <Button type='primary' size='large' onClick={() => handleToDownload(gameInfo[0].gameName, myGameDetail.gameid)}>下载</Button>
              </div>
            </>)
          }
          {/* <div className={style.detail}>
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
          </div> */}
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

const mapDispathToProps = ({ user, usergame, download }) => {
  return {
    getUserInfo: user.getUserInfo,
    getMyGameDetail: usergame.getMyGameDetail,
    setPercentComplete: download.setPercentComplete,
    setGame: download.setGame,
    setDownloadList: download.setDownloadList
  };
};

export default connect(mapStateToProps, mapDispathToProps)(Form.create({ name: 'Info' })(Details));