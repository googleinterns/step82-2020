import React from 'react';
import 'antd/dist/antd.css';
import '../../index.css';
import { Modal, Button, Form, Input } from 'antd';

const layout = {
  layout: 'vertical'
};

class ClinkModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = { loading: false, visible: false };
  }

  showModal = () => {
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
          onCancel={this.handleCancel}
          footer={[
            <Button key="back" onClick={this.handleCancel}>
              Cancel
            </Button>,
            <Button form="edit-clink" htmlType="submit" key="submit" type="primary" loading={loading} >
              Submit
            </Button>,
          ]}
        >
          <Form
            {...layout}
            name="edit-clink"
            initialValues={{
              remember: false,
            }}
            onFinish={this.onFinish}
            onFinishFailed={this.onFinishFailed}
          >
            <Form.Item
              label="Title"
              name="title"
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

export default ClinkModal
