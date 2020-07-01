import React from 'react';
import 'antd/dist/antd.css';
import '../../index.css';
import { Modal, Button, Form, Input } from 'antd';

const layout = {
  labelCol: {
    span: 8,
  },
  wrapperCol: {
    span: 16,
  },
};

class ModalWindow extends React.Component {
  constructor(props) {
    super(props);
    this.state = { loading: false, visible: false };
  }

  showModal = () => {
    console.log('showing modal!')
    this.setState({
      visible: true,
    });
  };

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

  handleOk = () => {
    // something here needs to handle if form was submitted successfully or not
    this.setState({ loading: true });
    setTimeout(() => {
      this.setState({ loading: false, visible: false });
    }, 3000);
  };

  handleCancel = () => {
    this.setState({ visible: false });
  };

  render() {
    const { visible, loading } = this.state;
    return (
      <div>
        {this.props.render(this)}
        <Modal
          visible={visible}
          title="Clink"
          onOk={this.handleOk}
          onCancel={this.handleCancel}
          footer={[
            <Button key="back" onClick={this.handleCancel}>
              Cancel
            </Button>,
            <Button form="clink" htmlType="submit" key="submit" type="primary" loading={loading} onClick={this.handleOk}>
              Submit
            </Button>,
          ]}
        >
          <Form
            {...layout}
            name="clink"
            initialValues={{
              remember: true,
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
        </Modal>
      </div>
    );
  }
}

export default ModalWindow