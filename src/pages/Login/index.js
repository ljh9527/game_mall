import React, { useState,useEffect } from 'react';
import { connect } from 'react-redux';
import md5 from 'md5';
import { Form, Icon, Input, Button, Checkbox } from 'antd';
import LoginHeader from '../../components/container/loginHeader';
import classnames from 'classnames';
import services from '../../services';
import style from './index.module.scss';
import { requestErrorHandler } from '../../utils';
const { ipcRenderer } = window.electron;

const LoginForm = (props) => {
  const { form, history, setUserInfo } = props;
  const defaultEmail = localStorage.getItem("EMAIL");
  const defaultPassword = localStorage.getItem("PASSWORD");
  const defaultToken = localStorage.getItem("TOKEN");
  const { getFieldDecorator, validateFields, resetFields } = form;
  const [accountSuccess, setAccountSuccess] = useState(false);
  const [issavepassword, setIsSavepassword] = useState(true);
  const [isLoginPage] = useState(true);

  useEffect(()=>{
    setIsSavepassword(defaultToken !== false ? true : false)
  },[defaultToken])
  const handleSubmit = e => {
    e.preventDefault();
    validateFields((err, values) => {
      if(values.password.length < 20){
        values.password = md5(values.password);
      }
      if (!err) {
        handleLogin(values);
      };
    });
  };
  const handleLogin = async (values) => {
    try {
      const { data } = await services.login(values);
      if (data.code === 200) {
        localStorage.setItem("EMAIL", values.email);
        if(issavepassword){
          localStorage.setItem("PASSWORD", values.password);
          localStorage.setItem("TOKEN", issavepassword);
        }else{
          localStorage.setItem("PASSWORD", "");
          localStorage.setItem("TOKEN", false);
        }
        setUserInfo(data.data);
        sessionStorage.setItem("OPENTIME", new Date().getTime());
        setAccountSuccess(false);
        ipcRenderer.send('login');
        if(data.data.isadmin){
          history.push('/game/edit');
          return ;
        }
        history.push('/index');
      } else {
        setAccountSuccess(true);
      }
    } catch (error) {
      requestErrorHandler(error)
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
  const savepassword = (e) => {
    setIsSavepassword(e.target.checked);
  }

  return (
    <LoginHeader isLoginPage={isLoginPage} history={history}>
      <div className={style.contentWrap}>
        <div className={style.loginTitle}>登录</div>
        <div className={style.loginBox}>
          <Form onSubmit={handleSubmit} className={style.loginForm}>
            <Form.Item>
              {getFieldDecorator('email', {
                rules: [{ required: true, message: '请输入邮箱!' }, {
                  type: 'email',
                  message: '请输入你的邮箱账号！',
                },],
                initialValue: defaultEmail
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
                initialValue: defaultPassword
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
            <Checkbox checked={issavepassword} className={style.savepassword} onChange={savepassword}>记住密码</Checkbox>
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

const mapStateToProps = ({ user }) => {
  return {
  };
};

const mapDispathToProps = ({ user }) => {
  return {
    setUserInfo: user.setUserInfo
  };
};

export default connect(mapStateToProps, mapDispathToProps)(Form.create({ name: 'normal_login' })(LoginForm));