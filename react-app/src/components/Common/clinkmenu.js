import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { editClink, deleteClink } from '../../features/clink';
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
  const usersToShare = useSelector(state => state.users.noWriteUsers);
  const sharedUsers = useSelector(state => state.users.writeUsers);
  const isCurrentUserFetched = useSelector(state => state.users.isCurrentUserFetched);
  const currentClinkId = useSelector(state => state.clink.currentClinkId);

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
    if (isCurrentUserFetched && currentClinkId !== 'All') {
      fetchUsers(currentToken).then(() => {
        dispatch(fetchUsersWrite(currentClinkId, currentToken));
      })
    }
  }, [currentClinkId]);

  const showEdit = () => {
    setEditVisible(true);
  };

  const showShare = () => {
    setShareVisible(true);
  };

  const onDeleteFinish = () => {
    dispatch(deleteClink(currentClinkId, currentToken));
  }

  const onEditFinish = (values) => {
    dispatch(editClink(values.title, currentClinkId, currentToken));
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
    dispatch(shareClink(currentClinkId, values.toShare, currentToken));
    setTimeout(() => {
      setLoading(false);
      setShareVisible(false);
      setEditVisible(false);
    }, 3000);
    shareForm.resetFields();
  };

  const onUnshareFinish = values => {
    setUnshareLoading(true);
    dispatch(unshareClink(currentClinkId, values.toRemove, currentToken));
    setTimeout(() => {
      setUnshareLoading(false);
      setShareVisible(false);
      setEditVisible(false);
    }, 3000);
    unshareForm.resetFields();
  };

  const onFinishFailed = (errorInfo) => {
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
      <Menu.Item key="delete" onClick={onDeleteFinish}>
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
            title: props.title
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
