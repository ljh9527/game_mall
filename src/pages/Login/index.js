import React, { useState } from 'react';
import { Form, Icon, Input, Button, Checkbox } from 'antd';
import style from './index.module.scss';

const formItemLayout = {
  labelCol: { span: 5 },
  wrapperCol: { span: 15 },
};
const formTailLayout = {
  labelCol: { span: 5 },
  wrapperCol: { span: 15, offset: 5 },
};

// 重置密码
const resetForm = (props) => {
  const { form, handleResetSub } = props;
  const { getFieldDecorator } = form;

  return (
    <Form {...formItemLayout} className={style.loginForm}>
      <Form.Item label="用户名">
        {getFieldDecorator('username', {
          rules: [{ required: true, message: '请输入用户名!' }],
        })(
          <Input
            prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
            placeholder="用户名"
          />,
        )}
      </Form.Item>
      <Form.Item label="邮箱">
        {getFieldDecorator('email', {
          rules: [{ required: true, message: '请输入注册时绑定的邮箱!' }],
        })(
          <Input
            prefix={<Icon type="mail" style={{ color: 'rgba(0,0,0,.25)' }} />}
            placeholder="邮箱"
          />,
        )}
      </Form.Item>
      <Form.Item label="验证码">
        {getFieldDecorator('code', {
          rules: [{ required: true, message: '请输入验证码!' }],
        })(
          <Input
            placeholder="请输入验证码"
            className={style.inputCode}
          />,
        )}
        <Button type="primary" >发送验证码</Button>
      </Form.Item>
      <Button className={style.resetButton} type="primary" onClick={handleResetSub}>提交</Button>
    </Form>
  );
}

const LoginForm = (props) => {
  const { form } = props;
  const [resetPassword, setResetPassword] = useState(false); // 重置密码
  const { getFieldDecorator, validateFields, resetFields } = form;

  const handleSubmit = e => {
    e.preventDefault();
    validateFields((err, values) => {
      if (!err) {
        console.log('提交成功');
      }
    });
  };
  const handleResetPassword = () => {
    setResetPassword(true);
    resetFields();
  };
  const handleResetSub = () => {
    validateFields((err, values) => {
      if (!err) {
        console.log('提交成功');
      }
    });
    setResetPassword(false);
    resetFields();
  }
  console.log('resetPassword', resetPassword);

  return (
    <div>
      {
        !resetPassword
          ? (
            <Form onSubmit={handleSubmit} className={style.loginForm}>
              <Form.Item label="用户名" {...formItemLayout}>
                {getFieldDecorator('username', {
                  rules: [{ required: true, message: '请输入用户名!' }],
                })(
                  <Input
                    prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                    placeholder="请输入用户名"
                  />,
                )}
              </Form.Item>
              <Form.Item label="密码" {...formItemLayout}>
                {getFieldDecorator('password', {
                  rules: [{ required: true, message: '请输入密码!' }],
                })(
                  <Input
                    prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                    type="password"
                    placeholder="请输入密码"
                  />,
                )}
              </Form.Item>
              <Form.Item {...formTailLayout}>
                {getFieldDecorator('remember', {
                  valuePropName: 'checked',
                  initialValue: true,
                })(<Checkbox>记住登录</Checkbox>)}
                <div className={style.loginFormForgot} onClick={handleResetPassword}>
                  忘记密码
              </div>
                <Button type="primary" htmlType="submit" className={style.loginFormButton}>
                  登录
              </Button>
                <div className={style.register}>没有账号，注册一个</div>
              </Form.Item>
            </Form>
          )
          : (
            resetForm({ form, handleResetSub })
          )
      }
    </div>
  );
}

export default Form.create({ name: 'normal_login' })(LoginForm);