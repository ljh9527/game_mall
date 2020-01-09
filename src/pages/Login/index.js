import React, { useState } from 'react';
import { Form, Icon, Input, Button, Checkbox } from 'antd';
import style from './index.module.scss';

const LoginForm = (props) => {
  const { form } = props;
  const [resetPassword, setResetPassword] = useState(false);
  const { getFieldDecorator, validateFields } = form;

  const handleSubmit = e => {
    e.preventDefault();
    validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
      }
    });
  };
  const handleResetPassword = ()=>{
    setResetPassword(true);
  }

  return (
    <Form onSubmit={handleSubmit} className={style.loginForm}>
      <Form.Item>
        {getFieldDecorator('username', {
          rules: [{ required: true, message: 'Please input your username!' }],
        })(
          <Input
            prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
            placeholder="Username"
          />,
        )}
      </Form.Item>
      <Form.Item>
        {getFieldDecorator('password', {
          rules: [{ required: true, message: 'Please input your Password!' }],
        })(
          <Input
            prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
            type="password"
            placeholder="Password"
          />,
        )}
      </Form.Item>
      <Form.Item>
        {getFieldDecorator('remember', {
          valuePropName: 'checked',
          initialValue: true,
        })(<Checkbox>记住登录</Checkbox>)}
        <a className={style.loginFormForgot} onClick={handleResetPassword}>
          忘记密码
          </a>
        <Button type="primary" htmlType="submit" className={style.loginFormButton}>
          登录
          </Button>
        Or <a href="">没有账号，注册一个</a>
      </Form.Item>
    </Form>
  );
}

export default Form.create({ name: 'normal_login' })(LoginForm);