import React from 'react';
import 'antd/dist/antd.css';
import '../../index.css';
import { EllipsisOutlined } from '@ant-design/icons';
import { Modal, Button, Form, Input } from 'antd';

const layout = {
  layout: 'vertical'
};

class BookmarkModal extends React.Component {
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
        <Button className="ellipsis-card-button" type="link" icon={<EllipsisOutlined />} onClick={this.showModal} />
        <Modal
          visible={visible}
          onCancel={this.handleCancel}
          footer={[
            <Button key="back" onClick={this.handleCancel}>
              Cancel
            </Button>,
            <Button form="edit-bookmark" htmlType="submit" key="submit" type="primary" loading={loading} >
              Submit
            </Button>,
          ]}
        >
          <Form
            {...layout}
            name="edit-bookmark"
            initialValues={{
              remember: false,
            }}
            onFinish={this.onFinish}
            onFinishFailed={this.onFinishFailed}
          >
            <Form.Item
              label="Link"
              name="link"
              rules={[
                {
                  required: false,
                },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label="Title"
              name="title"
              rules={[
                {
                  required: false,
                },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label="Description"
              name="description"
              rules={[
                {
                  required: false,
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

export default BookmarkModal
