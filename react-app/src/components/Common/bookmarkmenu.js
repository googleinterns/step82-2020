import React, { useState } from 'react';
import 'antd/dist/antd.css';
import '../../index.css';
import { EllipsisOutlined } from '@ant-design/icons';
import { Modal, Button, Form, Input, Menu, Dropdown } from 'antd';

const layout = {
  layout: 'vertical'
};

const BookmarkMenu = () => {
  const [isVisible, setVisible] = useState(false);
  const [isLoading, setLoading] = useState(false);

  const showModal = () => {
    setVisible(true);
  };

  const onFinish = values => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setVisible(false);
    }, 3000);
  };

  const onFinishFailed = errorInfo => {
    console.log('Failed:', errorInfo);
  };

  const handleCancel = () => {
    setVisible(false);
  };

  const menu = (<Menu>
    <Menu.Item key="edit" onClick={showModal}>
      Edit
    </Menu.Item>
    <Menu.Item key="delete">
      Delete
    </Menu.Item>
  </Menu>);

  return(
    <div>
      <Dropdown overlay={menu} trigger={['click']} className="ellipsis-card-button">
        <Button icon={<EllipsisOutlined />} type="link" className="ant-dropdown-link" onClick={e => e.preventDefault()} />
      </Dropdown>
      <Modal
        visible={isVisible}
        onCancel={handleCancel}
        footer={[
          <Button key="back" onClick={handleCancel}>
            Cancel
          </Button>,
          <Button form="edit-bookmark" htmlType="submit" key="submit" type="primary" loading={isLoading} >
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
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
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
};

export default BookmarkMenu;
