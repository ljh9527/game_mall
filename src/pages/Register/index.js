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

const LoginForm = (props) => {
  const { form } = props;
  const [resetPassword, setResetPassword] = useState(false); // 重置密码
  const { getFieldDecorator, validateFields } = form;

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
  };
  console.log('resetPassword', resetPassword);

  return (
    <div>
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
        <Form.Item label="邮箱" {...formItemLayout}>
          {getFieldDecorator('username', {
            rules: [{ required: true, message: '请输入绑定的邮箱!' }],
          })(
            <Input
              prefix={<Icon type="mail" style={{ color: 'rgba(0,0,0,.25)' }} />}
              placeholder="请输入绑定的邮箱"
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
          <Button type="primary" htmlType="submit" className={style.loginFormButton}>
            登录
              </Button>
        </Form.Item>
      </Form>
    </div>
  );
}

export default Form.create({ name: 'normal_login' })(LoginForm);