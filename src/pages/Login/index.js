import React, { useState } from 'react';
import { Form, Icon, Input, Button } from 'antd';
import services from '../../services';
import style from './index.module.scss';

const formItemLayout = {
  labelCol: { span: 5 },
  wrapperCol: { span: 15 },
};
const formTailLayout = {
  labelCol: { span: 5 },
  wrapperCol: { span: 15, offset: 5 },
};

const LoginForm = (props) => {
  const { form, history } = props;
  const { getFieldDecorator, validateFields, resetFields } = form;
  const [accountSuccess, setAccountSuccess] = useState(false);

  const handleSubmit = e => {
    e.preventDefault();
    validateFields((err, values) => {
      console.log(values);
      if (!err) {
        handleLogin(values);
      };
    });
  };
  const handleLogin = async (values) => {
    try {
      const { data } = await services.login(values);
      if (data.code === 200) {
        localStorage.setItem("username", values.username);
        localStorage.setItem("password", values.password);
        console.log(localStorage.getItem("username"));
        setAccountSuccess(false);
        history.push('/home');
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
    <div className={style.wrap}>
      <div className={style.loginBox}>
        <Form onSubmit={handleSubmit} className={style.loginForm}>
          <Form.Item label="邮箱" {...formItemLayout}>
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
          <Form.Item label="密码" {...formItemLayout} className={style.passwordItem}>
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
          <Form.Item {...formTailLayout}>
            <Button size="large" type="primary" htmlType="submit" className={style.loginFormButton}>
              登录
                </Button>
          </Form.Item>
        </Form>
        <div className={style.buttonBox}>
          <span className={style.loginFormForgot} onClick={handleResetPassword}>
            忘记密码？
                </span>
          <span>|</span>
          <span className={style.register} onClick={handleRegister}>立即注册</span>
        </div>
      </div>
    </div>
  );
}

export default Form.create({ name: 'normal_login' })(LoginForm);