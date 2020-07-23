import React from 'react';
import { useDispatch } from 'react-redux';
import { signUp } from '../../../features/users';
import 'antd/dist/antd.css';
import '../../../index.css';
import { message, Form, Input, Checkbox, Button } from 'antd';
import { UserOutlined, LockOutlined, MailOutlined } from '@ant-design/icons';

const SignUpPage = () => {

  const [form] = Form.useForm();

  const dispatch = useDispatch();

  const key = "signUpFeedBack";

  const signUpSucceedCallback = () => {
    setTimeout(() => {
      message.success({ content: 'Successfully signed up.', key, duration: 2 });
    }, 1000);
  };

  const signUpFailedCallback = (signUpError) => {
    setTimeout(() => {
      message.error({ content: signUpError, key, duration: 2 });
    }, 1000);
  };

  const onFinish = (values) => {
    message.loading({ content: 'Signing up...', key });
    dispatch(signUp(values.email, values.username, values.password, signUpSucceedCallback, signUpFailedCallback));
  };

  return (
    <Form
      form={form}
      name="register"
      onFinish={onFinish}
      scrollToFirstError
    >
      <Form.Item
        name="email"
        rules={[
          {
            type: 'email',
            message: 'The input is not a valid email!',
          },
          {
            required: true,
            message: 'Please input your email!',
          },
        ]}
      >
        <Input prefix={<MailOutlined className="site-form-item-icon" />} placeholder="Email" />
      </Form.Item>

      <Form.Item
        name="username"
        rules={[
          {
            required: true,
            message: 'Please input your username!',
            whitespace: true,
          },
        ]}
      >
        <Input autocomplete="username" prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Username" />
      </Form.Item>

      <Form.Item
        name="password"
        rules={[
          {
            required: true,
            message: 'Please input your password!',
          },
        ]}
        hasFeedback
      >
        <Input.Password autocomplete="new-password" prefix={<LockOutlined className="site-form-item-icon" />} placeholder="Password" />
      </Form.Item>

      <Form.Item
        name="confirm"
        dependencies={['password']}
        hasFeedback
        rules={[
          {
            required: true,
            message: 'Please confirm your password!',
          },
          ({ getFieldValue }) => ({
            validator(rule, value) {
              if (!value || getFieldValue('password') === value) {
                return Promise.resolve();
              }

              return Promise.reject('The two passwords that you entered do not match!');
            },
          }),
        ]}
      >
        <Input.Password autocomplete="new-password" prefix={<LockOutlined className="site-form-item-icon" />} placeholder="Confirm Password" />
      </Form.Item>

      <Form.Item
        name="agreement"
        valuePropName="checked"
        rules={[
          {
            validator: (_, value) =>
              value ? Promise.resolve() : Promise.reject('Should accept agreement'),
          },
        ]}
      >
        <Checkbox>
          I have read the <a href="">agreement</a>
        </Checkbox>
      </Form.Item>
      <Form.Item>
        <Button className="signup-form-button" type="primary" htmlType="submit">
          Register
        </Button>
      </Form.Item>
    </Form>
  );
};

export default SignUpPage;
