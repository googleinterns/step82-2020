import React from 'react';
import 'antd/dist/antd.css';
import '../../index.css';
import { Modal, Button, Form, Input } from 'antd';

// const layout = {
//   labelCol: {
//     span: 8,
//   },
//   wrapperCol: {
//     span: 16,
//   },
// };

class NewClink extends React.Component {

  onFinish = values => {
    console.log('Success:', values);
    this.setState({ loading: true });
    setTimeout(() => {
      this.setState({ loading: false, visible: false });
    }, 3000);
  };

  onFinishFailed = errorInfo => {
    console.log('Failed:', errorInfo);
  };

  render() {
    return (
          <Form
            {...layout}
            name="clink"
            initialValues={{
              remember: false,
            }}
            onFinish={this.onFinish}
            onFinishFailed={this.onFinishFailed}
          >
            <Form.Item
              label="Clink Title"
              name="clink title"
              rules={[
                {
                  required: true,
                  message: 'Please input a title for your clink!',
                },
              ]}
            >
              <Input />
            </Form.Item>
          </Form>
    );
  }
}

export default NewClink