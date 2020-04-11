/* eslint-disable react/prop-types */
import React from 'react';

import { Form, Input, Radio, Button } from 'antd';
import styles from './index.module.scss';
const { remote } = window.electron;
const { BrowserWindow } = remote;

const Info = (props) => {
  const {
    form,
    userInfo,
  } = props;
  const { getFieldDecorator, getFieldsValue } = form;
  const { Item } = Form;
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
  return (
    <div className={styles.formWraper}>
      <div className={styles.title}>资料修改</div>
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
        <Item label="性 别" colon={false}>
          <Radio.Group>
            <Radio value="man">男</Radio>
            <Radio value="female">女</Radio>
          </Radio.Group>
        </Item>
        <Item label="更改密码" colon={false} >
          <Button onClick={handleChangePassword}>前往更改密码</Button>
        </Item>
      </Form>
    </div>
  );
};

export default Form.create({ name: 'Info' })(Info);