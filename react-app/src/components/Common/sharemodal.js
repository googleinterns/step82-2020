import React from 'react';
import 'antd/dist/antd.css';
import '../../index.css';
import { Modal, Button, Form, Select } from 'antd';

const { Option } = Select;

const layout = {
  layout: 'vertical'
};

class ShareModal extends React.Component {
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
        {/* {this.props.render(this)} */}
        <Modal
          visible={visible}
          onCancel={this.handleCancel}
          footer={[
            <Button key="back" onClick={this.handleCancel}>
              Cancel
            </Button>,
            <Button form="share-clink" htmlType="submit" key="submit" type="primary" loading={loading} >
              Submit
            </Button>,
          ]}
        >
          <Form
            {...layout}
            name="share-clink"
            initialValues={{
              remember: false,
            }}
            onFinish={this.onFinish}
            onFinishFailed={this.onFinishFailed}
          >
            <Form.Item
              label="Share write access by username"
              name="username"
              rules={[
                {
                  required: false,
                },
              ]}
            >
              <Select mode="multiple">
                <Option value="Placeholder">Placeholder</Option>
              </Select>
            </Form.Item>
            <Form.Item
              label="Share read access by link"
              name="link"
              rules={[
                {
                  required: false,
                },
              ]}
            >
              { this.props.id }
            </Form.Item>
          </Form>
        </Modal>
      </div>
    );
  }
}

export default ShareModal
