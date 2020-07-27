import React from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { login } from '../../../features/users';
import 'antd/dist/antd.css';
import '../../../index.css';
import { message, Form, Input, Button, Checkbox } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';

const LoginPage = () => {

  const dispatch = useDispatch();
  const history = useHistory();

  const key = "loginFeedBack";

  const logInSucceedCallback = () => {
    setTimeout(() => {
      message.success({ content: 'Successfully logged in.', key, duration: 2 });
    }, 1000);
    history.push("/dashboard/All");
  };

  const logInFailedCallback = (loginError) => {
    setTimeout(() => {
      message.error({ content: loginError, key, duration: 2 });
    }, 1000);
  };

  const onFinish = (values) => {
    message.loading({ content: 'Logging in...', key });
    dispatch(login(values.username, values.password, values.remember, logInSucceedCallback, logInFailedCallback));
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
            message: 'Please input your Username!',
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
            message: 'Please input your Password!',
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
