import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import md5 from 'md5';
import { requestUrl } from '../../../config';
import service from '../../../services';
import { Form, Icon, Input, Upload, Button, message, Modal } from 'antd';
import style from './index.module.scss';
import { requestErrorHandler } from '../../../utils';
// const { remote } = window.electron;
// const { BrowserWindow } = remote;

const Details = (props) => {
  const { userInfo, getUserInfo, form } = props;
  const { getFieldDecorator, getFieldsValue, resetFields, getFieldValue, validateFields } = form;
  const [avatar, setAvater] = useState();
  const [visible, setVisible] = useState(false);
  const [pwdCheckStatus, setPwdCheckStatus] = useState(""); // 验证状态
  const { Item } = Form;
  const email = localStorage.getItem("EMAIL");

  useEffect(() => {
    getUserInfo({ email });
    setAvater(userInfo.avatar);
  }, []);
  useEffect(() => {
    setAvater(userInfo.avatar);
  }, [userInfo]);
  const handleChangePassword = () => {
    setVisible(true);
    // let win = new BrowserWindow({
    //   width: 430,
    //   height: 600,
    //   frame: false,
    //   movable: true,//可否移动
    //   webPreferences: {
    //     nodeIntegration: true, // 是否集成 Nodejs,把之前预加载的js去了，发现也可以运行
    //   }
    // })
    // win.on('closed', () => {
    //   win = null
    // })
    // win.loadURL('http://localhost:3456/resetPassword');
  };
  const cancelResetPassword = () => {
    setVisible(false);
  };
  // 密码确认
  const pwdCheck = (rule, value, callback) => {
    const password = getFieldValue('password');
    if (typeof (password) != 'undefined' && password === value) {
      setPwdCheckStatus("success");
      callback();
    } else if (typeof (value) === 'undefined') {
      setPwdCheckStatus("error");
      callback();
    } else {
      setPwdCheckStatus("error");
      callback('两次密码输入不一致！');
    }
  };
  const handleResetSub = () => {
    validateFields((err, values) => {
      handleResetPassword(values);
    });
  };
  // 提交重置密码表单
  const handleResetPassword = async (values) => {
    values.password = md5(values.password);
    const params = {
      email: email,
      password: values.password,
    }
    console.log(params);
    try {
      const { data } = await service.resetPassword(params);
      if (data.code === 200) {
        setVisible(false);
        message.success('密码修改成功');
      } else {
        Modal.error({
          content: '重置密码失败！',
        });
      };
    } catch (error) {
      console.log(error);
    }
  };
  const beforeUpload = (file) => {
    if (file.size / 1024 / 1024 > 10) {
      message.error('最多不能超过10M');
      return false;
    }
    return true;
  };
  const handleChangeAvatar = (info) => {
    if (info.file.status === 'done') {
      const file = info.file;
      const response = file.response;
      if (response.code === 200) {
        // const data = { attachmentId: response.result.returnPath, attachmentName: file.name };
        console.log(response.data);
        setAvater(`${requestUrl}${response.data.filename}`);
      }
    } else if (info.file.status === 'error') {
      message.error(`${info.file.name}  上传失败`);
    }
  };

  const handleCancel = () => {
    resetFields();
  };
  const handleSave = async () => {
    const value = getFieldsValue();
    const params = {
      nickname: value.nickname,
      introduction: value.introduction,
      email: email,
      avater: avatar
    }
    try {
      const { data } = await service.updateUserInfo(params);
      if (data.code === 200) {
        message.success("更改成功");
      } else {
        message.error("更改失败");
      };
    } catch (error) {
      requestErrorHandler(error);
    }
    getUserInfo({ email: email });
  };
  return (
    <div className={style.wrap}>
      <div className={style.background}>
        <div className={style.avatar}>
          <Upload
            action={service.uploadFile}
            name="file"
            listType="picture-card"
            showUploadList={false}
            onPreview={(file) => beforeUpload(file)}
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
            <Item label="更改密码" colon={false} >
              <Button onClick={handleChangePassword}>前往更改密码</Button>
            </Item>
          </Form>
        </div>
      </div>
      <Modal
        title="密码修改"
        visible={visible}
        footer={<Button className={style.resetButton} size="large" type="primary" onClick={handleResetSub}>提交</Button>}
        // onOk={handleOk}
        onCancel={cancelResetPassword}
      >
        <Form.Item label="密码">
          {getFieldDecorator('password', {
            validateTrigger: 'onBlur',
            rules: [
              { required: true, message: '请输入密码!' },
              { min: 6, message: '密码至少六位!' },
            ],
          })(
            <Input
              prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
              type="password"
              placeholder="请输入密码"
              size="large"
            />,
          )}
        </Form.Item>
        <Form.Item label="密码确认" hasFeedback validateStatus={pwdCheckStatus}>
          {getFieldDecorator('confirm', {
            validateTrigger: 'onBlur',
            rules: [
              { required: true, message: '请再次输入密码!' },
              { validator: pwdCheck },
            ],
          })(
            <Input
              prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
              type="password"
              placeholder="请再次输入密码"
              size="large"
            />,
          )}
        </Form.Item>
      </Modal>
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