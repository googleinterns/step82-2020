import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchAllUsers, fetchUsersWrite, shareClink, unshareClink } from '../../features/users';
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
  const clinkId = useSelector(state => state.clink.currentClinkId);
  const usersToShare = useSelector(state => state.users.noWriteUsers);
  const sharedUsers = useSelector(state => state.users.writeUsers);
  const isCurrentUserFetched = useSelector(state => state.users.isCurrentUserFetched);
  const dispatch = useDispatch();

  const [isLoading, setLoading] = useState(false);
  const [isUnshareLoading, setUnshareLoading] = useState(false);
  const [editIsVisible, setEditVisible] = useState(false);
  const [shareIsVisible, setShareVisible] = useState(false);

  const [shareForm] = Form.useForm();
  const [unshareForm] = Form.useForm();
  const [editForm] = Form.useForm();

  const fetchUsers = (token) => new Promise((resolve, reject) => {
    dispatch(fetchAllUsers(token));
    resolve();
  })

  useEffect(() => {
    if (isCurrentUserFetched && clinkId !== 'All') {
      fetchUsers(currentToken).then(() => {
        dispatch(fetchUsersWrite(clinkId, currentToken));
      })
    }
  }, [clinkId]);

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
    setLoading(true);
    dispatch(shareClink(clinkId, values.toShare, currentToken));
    setTimeout(() => {
      setLoading(false);
      setShareVisible(false);
      setEditVisible(false);
    }, 3000);
    shareForm.resetFields();
  };

  const onUnshareFinish = values => {
    setUnshareLoading(true);
    dispatch(unshareClink(clinkId, values.toRemove, currentToken));
    setTimeout(() => {
      setUnshareLoading(false);
      setShareVisible(false);
      setEditVisible(false);
    }, 3000);
    unshareForm.resetFields();
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
        ]}
      >
        <Form {...layout} name="share-clink" onFinish={onShareFinish} onFinishFailed={onFinishFailed}
          initialValues={{
            remember: false,
          }}
          form={shareForm}
        >
          <Form.Item label="Share write access by username" name="toShare"
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Select mode="multiple" 
              filterOption={(input, option) =>
                option.children.toLowerCase().includes(input.toLowerCase())
              }>
              {usersToShare.map(user => (
                <Option value={user.id}>{user.username}</Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" loading={isLoading}>
              Submit
            </Button>
          </Form.Item>
        </Form>
        <Form {...layout} name="unshare-clink" 
        onFinish={onUnshareFinish} 
        onFinishFailed={onFinishFailed}
          initialValues={{
            remember: false,
          }}
          form={unshareForm}
        > 
          <Form.Item label="Remove write access:" name="toRemove"
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Select mode="multiple" 
              filterOption={(input, option) =>
                option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
              }>
              {sharedUsers.map(user => (
                <Option value={user.id}>{user.username}</Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" loading={isUnshareLoading}>
              Submit
            </Button>
          </Form.Item>
        </Form>
          Share read access by link:
            {/* clink url goes here */}
      </Modal>
    </>
  );
};

export default ClinkMenu;
