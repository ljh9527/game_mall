import React, { useState, useEffect } from 'react';
import service from '../../services';
import { Form, Icon, Input, Button, Modal, Tooltip } from 'antd';
import style from './index.module.scss';

const formItemLayout = {
  labelCol: { span: 5 },
  wrapperCol: { span: 15 },
};
// const formTailLayout = {
//   labelCol: { span: 5 },
//   wrapperCol: { span: 15, offset: 5 },
// };

const LoginForm = (props) => {
  const {
    form,
    history,
  } = props;
  const { getFieldDecorator, validateFields, resetFields, getFieldsValue, getFieldValue } = form;
  const [isSendCode, setIsSendCode] = useState(false); // 是否成功发送验证码
  const [count, setCount] = useState(60); // 倒计时
  const [pwdCheckStatus, setPwdCheckStatus] = useState(""); // 验证状态

  // 获取成功处理
  useEffect(() => {
    if (count > 0 && isSendCode === true) {
      setTimeout(() => {
        setCount(count - 1);
      }, 1000);
    } else {
      setCount(60);
      setIsSendCode(false);
    }
  }, [count, isSendCode]);
  // 处理验证框提交
  const handleResetSub = () => {
    validateFields((err, values) => {
      console.log(err);
      if (!err) {
        handleRegister(values);
        // countDown();
      }
    });
  };
  // 提交注册表单
  const handleRegister = async (values) => {
    const { data } = await service.addAccount(values);
    if (data.code === 200) {
      console.log(data.message);
      countDown();
    };
  };
  // 返回登录
  const handleGoLogin = () => {
    resetFields();
    history.push('/');
  };
  // 请求验证码
  const handleGetCode = async () => {
    // 获取输入邮箱
    const inputValues = getFieldsValue(['email', 'username']);
    console.log(inputValues);
    // 发送请求
    // const data = await 
    setIsSendCode(true);
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
  // 密码更改成功弹出框
  const countDown = () => {
    let secondsToGo = 5;
    const modal = Modal.success({
      title: '密码修改成功',
      content: `密码修改成功，${secondsToGo}秒后将返回登录页面！`,
    });
    const timer = setInterval(() => {
      secondsToGo -= 1;
      modal.update({
        content: `密码修改成功，${secondsToGo}秒后将返回登录页面！`,
      });
    }, 1000);
    setTimeout(() => {
      clearInterval(timer);
      modal.destroy();
      handleGoLogin();
    }, secondsToGo * 1000);
  }

  return (
    <div className={style.wrap}>
      <div className={style.loginBox}>
        <Form {...formItemLayout} className={style.loginForm}>
          <Form.Item label="邮箱">
            {getFieldDecorator('email', {
              rules: [
                {
                  type: 'email',
                  message: '请输入要绑定的邮箱账号！',
                },
                {
                  required: true,
                  message: '请输入要绑定的邮箱账号!',
                },
              ],
            })(
              <Input
                prefix={<Icon type="mail" style={{ color: 'rgba(0,0,0,.25)' }} />}
                placeholder="邮箱"
                size="large"
              />,
            )}
          </Form.Item>
          <Form.Item label="验证码">
            {getFieldDecorator('code', {
              rules: [{ required: true, message: '请输入验证码!' }],
            })(
              <Input
                prefix={<Icon type="code" style={{ color: 'rgba(0,0,0,.25)' }} />}
                placeholder="请输入验证码"
                className={style.inputCode}
                size="large"
              />,
            )}
            <Button
              type="primary"
              size="large"
              className={style.getCodeButton}
              onClick={handleGetCode}
              disabled={isSendCode}
            >{!isSendCode ? '获取验证码' : `${count}秒后重发`}
            </Button>
          </Form.Item>
          <Form.Item label={
            <span>
              昵称&nbsp;
            <Tooltip title="你希望其他人叫你什么?">
                <Icon type="question-circle-o" />
              </Tooltip>
            </span>
          }>
            {getFieldDecorator('nickname', {
              rules: [{ required: true, message: '给自己选个昵称吧!' }],
            })(
              <Input
                prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                placeholder="昵称"
                size="large"
              />,
            )}
          </Form.Item>
          <Form.Item label="密码" {...formItemLayout}>
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
          <Form.Item label="密码确认" {...formItemLayout} hasFeedback validateStatus={pwdCheckStatus}>
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
          <Button className={style.resetButton} size="large" type="primary" onClick={handleResetSub}>提交</Button>
        </Form>
        <div className={style.buttonBox}>
          <span className={style.loginForm} onClick={handleGoLogin}>
            返回登录
          </span>
        </div>
      </div>
    </div>
  );
}

export default Form.create({ name: 'normal_login' })(LoginForm);