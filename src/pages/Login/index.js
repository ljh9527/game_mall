import React from 'react';
import { Form, Icon, Input, Button } from 'antd';
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

  const handleSubmit = e => {
    e.preventDefault();
    validateFields((err, values) => {
      if (!err) {
        console.log('提交成功');
      }
    });
  };
  // 处理忘记密码
  const handleResetPassword = () => {
    resetFields();
    history.push('/resetPassword');
  };
  // 处理点击注册
  const handleRegister = () => {
    resetFields();
    history.push('/register');
  }

  return (
    <div className={style.wrap}>
      <div className={style.loginBox}>
        <Form onSubmit={handleSubmit} className={style.loginForm}>
          <Form.Item label="账号" {...formItemLayout}>
            {getFieldDecorator('username', {
              rules: [{ required: true, message: '请输入邮箱!' }],
            })(
              <Input
                prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                placeholder="请输入邮箱"
                size="large"
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
                size="large"
              />,
            )}
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