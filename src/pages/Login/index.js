import React, { useState } from 'react';
import md5 from 'md5';
import { Form, Icon, Input, Button, Checkbox } from 'antd';
import LoginHeader from '../../components/container/loginHeader';
import classnames from 'classnames';
import services from '../../services';
import style from './index.module.scss';
const { ipcRenderer } = window.electron;

const LoginForm = (props) => {
  const { form, history } = props;
  const { getFieldDecorator, validateFields, resetFields } = form;
  const [accountSuccess, setAccountSuccess] = useState(false);
  const [isLoginPage] = useState(true);

  const handleSubmit = e => {
    e.preventDefault();
    validateFields((err, values) => {
      values.password = md5(values.password);
      if (!err) {
        handleLogin(values);
      };
    });
  };
  const handleLogin = async (values) => {
    try {
      const { data } = await services.login(values);
      if (data.code === 200) {
        console.log(data);
        localStorage.setItem("EMAIL", values.email);
        // localStorage.setItem("password", values.password);
        console.log(localStorage.getItem("EMAIL"));
        setAccountSuccess(false);
        ipcRenderer.send('login');
        history.push('/index');
      } else {
        setAccountSuccess(true);
      }
    } catch (error) {
      console.log(error);
    }
  };
  // 清楚登录失败提示
  const handleClick = () => {
    setAccountSuccess(false);
  }
  // 处理忘记密码
  const handleResetPassword = () => {
    resetFields();
    history.push('/resetPassword');
  };
  // 处理点击注册
  const handleRegister = () => {
    resetFields();
    history.push('/register');
  };

  return (
    <LoginHeader isLoginPage={isLoginPage} history={history}>
      <div className={style.contentWrap}>
        <div className={style.loginTitle}>登录</div>
        <div className={style.loginBox}>
          <Form onSubmit={handleSubmit} className={style.loginForm}>
            <Form.Item>
              {getFieldDecorator('email', {
                rules: [{ required: true, message: '请输入邮箱!' }],
              })(
                <Input
                  prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                  onClick={handleClick}
                  placeholder="请输入邮箱"
                  size="large"
                />,
              )}
            </Form.Item>
            <Form.Item className={style.passwordItem}>
              {getFieldDecorator('password', {
                rules: [
                  { required: true, message: '请输入密码!' },
                ],
              })(
                <Input
                  prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                  onClick={handleClick}
                  type="password"
                  placeholder="请输入密码"
                  size="large"
                />,
              )}
              {
                accountSuccess ? (<span className={style.failTips}>账号或密码错误</span>) : (<></>)
              }
            </Form.Item>
            <Form.Item>
              <Button size="large" type="primary" htmlType="submit" className={style.loginFormButton}>
                登录
            </Button>
            </Form.Item>
          </Form>
          <div className={style.buttonBox}>
            <Checkbox className={style.automaticLogon} >自动登录</Checkbox>
            <span className={classnames(style.loginFormForgot, style.buttonItem)} onClick={handleResetPassword}>
              忘记密码？
          </span>
            <span className={style.buttonItem}>|</span>
            <span className={classnames(style.register, style.buttonItem)} onClick={handleRegister}>立即注册</span>
          </div>
        </div>
      </div>
    </LoginHeader>
  );
}

export default Form.create({ name: 'normal_login' })(LoginForm);