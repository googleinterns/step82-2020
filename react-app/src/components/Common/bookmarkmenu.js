import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { editBookmark, deleteBookmark } from '../../features/clink';
import 'antd/dist/antd.css';
import '../../index.css';
import { EllipsisOutlined } from '@ant-design/icons';
import { Modal, Button, Form, Input, Menu, Dropdown } from 'antd';

const layout = {
  layout: 'vertical'
};

const BookmarkMenu = (props) => {

  const currentToken = localStorage.getItem('currentToken');
  const currentClinkId = useSelector(state => state.clink.currentClinkId)

  const [isVisible, setVisible] = useState(false);
  const [isLoading, setLoading] = useState(false);

  const dispatch = useDispatch()

  const [editForm] = Form.useForm();

  const showModal = () => {
    setVisible(true);
  };

  const onDeleteFinish = () => {
    dispatch(deleteBookmark(currentClinkId, props.id, currentToken))
  }

  const onEditFinish = values => {
    console.log(props.id)
    dispatch(editBookmark(values.link || "", values.title || "", values.description || "", currentClinkId, props.id, currentToken));
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setVisible(false);
    }, 3000);
    editForm.resetFields()
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
    <Menu.Item key="delete" onClick={onDeleteFinish}>
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
          <Button form="edit-bookmark" htmlType="submit" key="submit" type="primary" loading={isLoading}>
            Submit
          </Button>,
        ]}
      >
        <Form
          {...layout}
          form={editForm}
          name="edit-bookmark"
          initialValues={{
            remember: false,
          }}
          onFinish={onEditFinish}
          onFinishFailed={onFinishFailed}
        >
          <Form.Item
            label="Link"
            name="link"
            rules={[
              {
                required: false,
                message: 'Please input a valid link for your bookmark!',
                pattern: new RegExp('^(?:[a-z]+:)?//', 'i'),
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
