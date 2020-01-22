import React, { useState, useEffect } from 'react';
import { Form, Icon, Input, Button, Modal } from 'antd';
import service from '../../services';
import LoginHeader from '../../components/container/loginHeader';
import style from './index.module.scss';

// 重置密码
const ResetForm = (props) => {
  const {
    form,
    history,
  } = props;
  const { getFieldDecorator, validateFields, resetFields, getFieldsValue } = form;
  const [isSendCode, setIsSendCode] = useState(false); // 是否成功发送验证码
  const [count, setCount] = useState(60); // 倒计时
  // const [pwdCheckStatus, setPwdCheckStatus] = useState(""); // 验证状态

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
        console.log('提交成功');
        resetFields();
        // handleNext();
        countDown();
      }
    });
  };
  // 返回登录
  const handleGoLogin = () => {
    resetFields();
    history.push('/login');
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
  // const pwdCheck = (rule, value, callback) => {
  //   const password = getFieldValue('password');
  //   console.log(typeof (password));
  //   console.log(typeof (value));
  //   if (typeof (password) != 'undefined' && password === value) {
  //     setPwdCheckStatus("success");
  //     callback();
  //   } else if (typeof (value) === 'undefined') {
  //     setPwdCheckStatus("error");
  //     callback();
  //   } else {
  //     setPwdCheckStatus("error");
  //     callback('两次密码输入不一致！');
  //   }
  // };
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
    <LoginHeader history={history}>
      <div className={style.contentWrap}>
        <div className={style.loginTitle}>
          <div>忘记密码</div>
        </div>
        <div className={style.loginBox}>
          <Form className={style.loginForm}>
            <Form.Item>
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
            <Form.Item className={style.code}>
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
            <Button className={style.resetButton} size="large" type="primary" onClick={handleResetSub}>提交</Button>
          </Form>
        </div>
      </div>
    </LoginHeader>
  );
}

export default Form.create({ name: 'reset_login' })(ResetForm);