import React, { useState, useEffect } from 'react';
import { Form, Icon, Input, Button, Modal } from 'antd';
import service from '../../services';
import md5 from 'md5';
import LoginHeader from '../../components/container/loginHeader';
import style from './index.module.scss';

// 重置密码
const ResetForm = (props) => {
  const {
    form,
    history,
  } = props;
  const { getFieldDecorator, validateFields, resetFields, getFieldsValue, getFieldValue } = form;
  const [isSendCode, setIsSendCode] = useState(false); // 是否成功发送验证码
  const [count, setCount] = useState(60); // 倒计时
  const [pwdCheckStatus, setPwdCheckStatus] = useState(""); // 验证状态
  const [step, setStep] = useState(0);
  const [userEmail, setUserEmail] = useState('');

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
      console.log(values);
      if (!err) {
        if (step === 0) {
          const inputValues = getFieldsValue(['email','code']);
          setUserEmail(inputValues.email);
          setStep(1);
          // try {
          //   const { data } = await service.addAccount({inputValues.code});
          //   if (data.code === 200) {
          //     console.log(data.message);
          //   } else{
          //     console.log(data.message);
          //   };
          // } catch (error) {
          //   console.log(error);
          // }
          return;
        }
        handleResetPassword(values);
        resetFields();
      }
    });
  };
  // 返回登录
  const handleGoLogin = () => {
    resetFields();
    history.push('/');
  };
  // 请求验证码
  const handleGetCode = async () => {
    // 获取输入邮箱
    const inputValues = getFieldsValue(['email']);
    console.log(inputValues);
    // 发送请求
    try {
      // 发送请求
      const { data } = await service.verificationCode(inputValues);
      setUserEmail(inputValues);
    } catch (error) {
      console.log(error);
    }
    setIsSendCode(true);
  };
   // 提交重置密码表单
   const handleResetPassword = async (values) => {
    console.log(userEmail);
    values.password = md5(values.password);
    const params = {
      email: userEmail,
      password: values.password,
    }
    console.log(params);
    try {
      const { data } = await service.resetPassword(params);
      if (data.code === 200) {
        countDown();
      } else{
        Modal.error({
          content: '重置密码失败！',
        });
      };
    } catch (error) {
      console.log(error);
    }
  };
  // 密码确认
  const pwdCheck = (rule, value, callback) => {
    const password = getFieldValue('password');
    console.log(typeof (password));
    console.log(typeof (value));
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
    <LoginHeader history={history}>
      <div className={style.contentWrap}>
        <div className={style.loginTitle}>
          <div>更改密码</div>
        </div>
        <div className={style.loginBox}>
          <Form className={style.loginForm}>
          {
              step === 0 ? (
                <>
                  <Form.Item>
                    {getFieldDecorator('email', {
                      validateTrigger: 'onBlur',
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
                </>) : (<>
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
                </>)
            }
            <Button className={style.resetButton} size="large" type="primary" onClick={handleResetSub}>{step === 0 ? '下一步' : "提交"}</Button>
          </Form>
        </div>
      </div>
    </LoginHeader>
  );
}

export default Form.create({ name: 'reset_login' })(ResetForm);