import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchUsers } from '../../features/users';
import 'antd/dist/antd.css';
import '../../index.css';
import { EllipsisOutlined } from '@ant-design/icons';
import { Menu, Dropdown, Button, Modal, Form, Input, Select } from 'antd';

const { Option } = Select;

const layout = {
  layout: 'vertical'
};

// interactions with clinks
const ClinkMenu = (props) => {

  const currentToken = localStorage.getItem('currentToken');
  const users = useSelector(state => state.users.users);
  const isCurrentUserFetched = useSelector(state => state.users.isCurrentUserFetched);
  const dispatch = useDispatch();

  const [isLoading, setLoading] = useState(false);
  const [editIsVisible, setEditVisible] = useState(false);
  const [shareIsVisible, setShareVisible] = useState(false);

  const [shareForm] = Form.useForm();
  const [editForm] = Form.useForm();

  useEffect(() => {
    if (isCurrentUserFetched) {
      dispatch(fetchUsers(currentToken));
    }
  }, []);

  const showEdit = () => {
    setEditVisible(true);
  };

  const showShare = () => {
    setShareVisible(true);
  };

  const onEditFinish = values => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setEditVisible(false);
      setShareVisible(false);
    }, 3000);
    editForm.resetFields();
  };

  const onShareFinish = values => {
    console.log(values);
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setShareVisible(false);
      setEditVisible(false);
    }, 3000);
    shareForm.resetFields();
  };

  const onFinishFailed = errorInfo => {
    console.log('Failed:', errorInfo);
  };

  const handleCancel = () => {
    shareForm.resetFields();
    editForm.resetFields();
    setEditVisible(false);
    setShareVisible(false);
  };

  const menu = (
    <Menu>
      <Menu.Item key="edit" onClick={showEdit}>
        Edit
      </Menu.Item>
      <Menu.Item key="delete">
        Delete
      </Menu.Item>
      <Menu.Item key="share" onClick={showShare}>
        Share
      </Menu.Item>
    </Menu>
  );

  return (
    <>
      <Dropdown overlay={menu} trigger={['click']} className={props.menuClass}>
        <Button icon={<EllipsisOutlined />} type="link" className="ant-dropdown-link" onClick={e => e.preventDefault()} />
      </Dropdown>
      <Modal visible={editIsVisible} onCancel={handleCancel}
        footer={[
          <Button key="back" onClick={handleCancel}>
            Cancel
          </Button>,
          <Button form="edit-clink" htmlType="submit" key="submit" type="primary" loading={isLoading} >
            Submit
          </Button>,
        ]}
      >
        <Form {...layout} name="edit-clink" onFinish={onEditFinish} onFinishFailed={onFinishFailed}
          initialValues={{
            remember: false,
          }}
          form={editForm}
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
      <Modal visible={shareIsVisible} onCancel={handleCancel}
        footer={[
          <Button key="back" onClick={handleCancel}>
            Cancel
          </Button>,
          <Button form="share-clink" htmlType="submit" key="submit" type="primary" loading={isLoading} >
            Submit
          </Button>,
        ]}
      >
        <Form {...layout} name="share-clink" onFinish={onShareFinish} onFinishFailed={onFinishFailed}
          initialValues={{
            remember: false,
          }}
          form={shareForm}
        >
          <Form.Item label="Share write access by username" name="username"
            rules={[
              {
                required: false,
              },
            ]}
          >
            <Select mode="multiple" 
              filterOption={(input, option) =>
                option.children.toLowerCase().includes(input.toLowerCase())
              }>
              {users.map(user => (
                <Option value={user.id}>{user.username}</Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item label="Share read access by link" name="link"
            rules={[
              {
                required: false,
              },
            ]}
          >
            {/* clink url goes here */}
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default ClinkMenu;
