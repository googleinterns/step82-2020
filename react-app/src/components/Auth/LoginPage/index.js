import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { login } from '../../../features/users';
import 'antd/dist/antd.css';
import '../../../index.css';
import { message, Form, Input, Button, Checkbox } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';

const LoginPage = () => {

  const dispatch = useDispatch()

  var isLoggingIn = useSelector((state) => state.users.isLoggingIn)
  var loginError = useSelector((state) => state.users.loginError)

  const history = useHistory()

  const loggingIn = () => {
    const key = "loginFeedBack"
    message.loading({ content: 'Logging in...', key })
    if (loginError) {
      setTimeout(() => {
        message.error({ content: loginError, key, duration: 2 });
      }, 1000);
    } else {
      setTimeout(() => {
        message.success({ content: 'Successfully Logged In', key, duration: 2 });
      }, 500)
      history.push("/dashboard")
    }
  };

  const onFinish = (values) => {
    dispatch(login(values.username, values.password))
    if(!isLoggingIn) loggingIn()
  };

  return (
    <Form
      name="normal_login"
      initialValues={{
        remember: true,
      }}
      onFinish={onFinish}
    >
      <Form.Item
        name="username"
        rules={[
          {
            required: true,
            message: "Please input your Username!",
          },
        ]}
      >
        <Input
          autocomplete="username"
          prefix={<UserOutlined className="site-form-item-icon" />}
          placeholder="Username"
        />
      </Form.Item>

      <Form.Item
        name="password"
        rules={[
          {
            required: true,
            message: "Please input your Password!",
          },
        ]}
      >
        <Input.Password
          autocomplete="current-password"
          prefix={<LockOutlined className="site-form-item-icon" />}
          type="password"
          placeholder="Password"
        />
      </Form.Item>

      <Form.Item>
        <Form.Item name="remember" valuePropName="checked" noStyle>
          <Checkbox>Remember me</Checkbox>
        </Form.Item>

        <a className="login-form-forgot" href="">
          Forgot password
        </a>
      </Form.Item>

      <Form.Item>
        <Button
          className="login-form-button"
          type="primary"
          htmlType="submit"
        >
          Log in
        </Button>
      </Form.Item>
    </Form>
  )
};

export default LoginPage;
