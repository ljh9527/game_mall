import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import service from '../../../services';
import { Form, Icon, Input, Upload, Button, message } from 'antd';
import style from './index.module.scss';
const { remote } = window.electron;
const { BrowserWindow } = remote;

const imgUrl = 'http://www.gravatar.com/avatar/5de1db3c896e5fdd7833c2c5d255783a?s=46&d=identicon';
const Details = (props) => {
  const { userInfo, getUserInfo, form } = props;
  const { getFieldDecorator, getFieldsValue, resetFields } = form;
  const [avatar, setAvater] = useState(imgUrl);
  const { Item } = Form;
  const mockGetOSSData  = {
    dir: 'user-dir/',
    expire: '1577811661',
    host: '//www.mocky.io/v2/5cc8019d300000980a055e76',
    accessId: 'c2hhb2RhaG9uZw==',
    policy: 'eGl4aWhhaGFrdWt1ZGFkYQ==',
    signature: 'ZGFob25nc2hhbw==',
  };
  useEffect(() => {
    const email = localStorage.getItem("EMAIL");
    getUserInfo({ email });
    setAvater(userInfo.avatar);
  }, []);
  useEffect(() => {
    setAvater(userInfo.avatar);
  }, [userInfo]);
  const handleChangePassword = () => {
    let win = new BrowserWindow({
      width: 430,
      height: 600,
      frame: false,
      movable: true,//可否移动
      webPreferences: {
        nodeIntegration: true, // 是否集成 Nodejs,把之前预加载的js去了，发现也可以运行
      }
    })
    win.on('closed', () => {
      win = null
    })
    win.loadURL('http://localhost:3456/resetPassword');
  };
  const beforeUpload = (file) => {
    if (file.size / 1024 / 1024 > 10) {
      message.error('最多不能超过10M');
      return false;
    }
    return true;
  };
  const handleChangeAvatar = async (file) => {
    console.log('更改图片');
    console.log('file', file);
    setAvater(file.file.thumbUrl);
  };
  // const handlePreview = (file)=>{
  //   console.log('file',file);
  // }
  const handleCancel = () => {
    resetFields();
  };
  const handleSave = async () => {
    const value = getFieldsValue();
    const params = {
      nickname: value.nickname,
      introduction: value.introduction,
      email: localStorage.getItem("EMAIL")
    }
    try {
      const { data } = await service.updateUserInfo(params);
      if (data.code === 200) {
        message.success("更改成功");
      } else {
        message.error("更改失败");
      };
    } catch (error) {
      console.log(error);
    }
    getUserInfo({ email: localStorage.getItem("EMAIL") });
  };
  return (
    <div className={style.wrap}>
      <div className={style.background}>
        <div className={style.avatar}>
          <Upload
            name="avater"
            listType="picture-card"
            showUploadList={false}
            onPreview={(file)=>beforeUpload(file)}
            onChange={(file) => handleChangeAvatar(file)}
          >
            <>
              <img src={avatar} alt='头像' /><div className={style.changeAvatar}>
                <Icon type="camera" theme="filled" />
                <div>更换头像</div>
              </div>
            </>
          </Upload>
        </div>
        <div className={style.cover}>
          <div className={style.userName}>
            {userInfo.nickname}
          </div>
          <div className={style.buttonBox}>
            <Button type="ghost" shape='round' size='small' onClick={handleCancel}>取消</Button>
            <Button type="ghost" shape='round' size='small' className={style.save} onClick={handleSave}>保存</Button>
          </div>
        </div>
      </div>
      <div className={style.content}>
        <div className={style.formWraper}>
          <div className={style.title}>资料修改</div>
          <Form layout="inline">
            <Item label="昵称" colon={false} >
              {getFieldDecorator('nickname', {
                initialValue: userInfo.nickname
              })(
                <Input allowClear={true} placeholder="给自己取个昵称吧" />,
              )}
            </Item>
            <Item label="个人简介" colon={false} >
              {getFieldDecorator('introduction', {
                initialValue: userInfo.introduction
              })(
                <Input.TextArea allowClear={true} placeholder="用一句话来形容你自己~" />,
              )}
            </Item>
            {/* <Item label="性 别" colon={false}>
              <Radio.Group>
                <Radio value="man">男</Radio>
                <Radio value="female">女</Radio>
              </Radio.Group>
            </Item> */}
            <Item label="更改密码" colon={false} >
              <Button onClick={handleChangePassword}>前往更改密码</Button>
            </Item>
          </Form>
        </div>
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
    getUserInfo: user.getUserInfo,
  };
};
export default connect(mapStateToProps, mapDispathToProps)(Form.create({ name: 'Info' })(Details));