import React from 'react';
import 'antd/dist/antd.css';
import '../../index.css';
import { EllipsisOutlined } from '@ant-design/icons';
import { Menu, Dropdown, Button, Modal, Form, Input, Select } from 'antd';

const { Option } = Select;

const layout = {
  layout: 'vertical'
};

// interactions with clinks
class ClinkMenu extends React.Component {
  constructor(props) {
    super(props);
    this.state = { loading: false, editVisible: false, shareVisible: false, };
  }

  showEdit = () => {
    this.setState({
      editVisible: true,
    });
  };

  showShare = () => {
    this.setState({
      shareVisible: true,
    });
  };

  onEditFinish = values => {
    console.log('Success:', values);
    this.setState({ loading: true });
    setTimeout(() => {
      this.setState({ loading: false, editVisible: false });
    }, 3000);
  };

  onShareFinish = values => {
    console.log('Success:', values);
    this.setState({ loading: true });
    setTimeout(() => {
      this.setState({ loading: false, shareVisible: false });
    }, 3000);
  };

  onFinishFailed = errorInfo => {
    console.log('Failed:', errorInfo);
  };

  handleCancel = () => {
    this.setState({ editVisible: false, shareVisible: false });
  };

  render() {
    const { editVisible, shareVisible, loading } = this.state;

    const menu = (<Menu>
      <Menu.Item key="edit" onClick={this.showEdit}>
        Edit
      </Menu.Item>
      <Menu.Item key="delete">
        Delete
      </Menu.Item>
      <Menu.Item key="share" onClick={this.showShare}>
        Share
      </Menu.Item>
    </Menu>);

    return (
      <>
        <Dropdown overlay={menu} trigger={['click']}>
          <Button icon={<EllipsisOutlined />} type="link" className="ant-dropdown-link" onClick={e => e.preventDefault()} />
        </Dropdown>
        <Modal visible={editVisible} onCancel={this.handleCancel}
          footer={[
            <Button key="back" onClick={this.handleCancel}>
              Cancel
            </Button>,
            <Button form="edit-clink" htmlType="submit" key="submit" type="primary" loading={loading} >
              Submit
            </Button>,
          ]}
        >
          <Form {...layout} name="edit-clink" onFinish={this.onEditFinish} onFinishFailed={this.onFinishFailed}
            initialValues={{
              remember: false,
            }}
          >
            <Form.Item label="Edit Clink Title" name="title"
              rules={[
                {
                  required: true,
                  message: 'You haven\'t edited the title',
                },
              ]}
            >
              <Input />
            </Form.Item>
          </Form>
        </Modal>
        <Modal visible={shareVisible} onCancel={this.handleCancel}
          footer={[
            <Button key="back" onClick={this.handleCancel}>
              Cancel
            </Button>,
            <Button form="share-clink" htmlType="submit" key="submit" type="primary" loading={loading} >
              Submit
            </Button>,
          ]}
        >
          <Form {...layout} name="share-clink" onFinish={this.onShareFinish} onFinishFailed={this.onFinishFailed}
            initialValues={{
              remember: false,
            }}
          >
            <Form.Item label="Share write access by username" name="username"
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
            <Form.Item label="Share read access by link" name="link"
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
      </>
    );
  }
}

export default ClinkMenu;
