import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addClink, addBookmark, fetchWriteClinks } from '../../features/clink';
import 'antd/dist/antd.css';
import '../../index.css';
import { PlusOutlined } from '@ant-design/icons';
import { message, Modal, Tabs, Button, Form, Input, Select, Switch } from 'antd';


const { Option } = Select;
const { TabPane } = Tabs;

const NewButton = () => {

  const currentToken = localStorage.getItem('currentToken');
  const writeClinks = useSelector(state => state.clink.writeClinks);
  const isCurrentUserFetched = useSelector(state => state.users.isCurrentUserFetched);

  const dispatch = useDispatch();
  const [bookmarkForm] = Form.useForm();
  const [clinkForm] = Form.useForm();
  const key = "formFeedback";

  const [isVisible, setIsVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [form, setForm] = useState('bookmark');

  useEffect(() => {
    if (isCurrentUserFetched) {
      dispatch(fetchWriteClinks(currentToken));
    }
  }, []);

  const showModal = () => {
    setIsVisible(true);
  };

  const onBookmarkFinish = values => {
    setIsLoading(true);
    if (!values.description) {
      values.description = ' ';
    }
    if (!values.toAdd) {
      values.toAdd = [];
    }
    dispatch(addBookmark(values.link, values.title, values.description, values.toAdd, currentToken, addSuccess, addFail));
    bookmarkForm.resetFields();
    setTimeout(() => {
      setIsLoading(false);
      setIsVisible(false);
    }, 3000);
  };

  const onClinkFinish = values => {
    setIsLoading(true);
    dispatch(addClink(values.clinkTitle, values.privacy || false, currentToken, addSuccess, addFail));
    clinkForm.resetFields();
    setTimeout(() => {
      setIsLoading(false);
      setIsVisible(false);
    }, 3000);
  };

  const addSuccess = () => {
    setTimeout(() => {
      message.success({ content: 'Successfully added clink.', key, duration: 2} );
    }, 1000);
  };

  const addFail = (error) => {
    setTimeout(() => {
      message.error({ content: error, key, duration: 2});
    }, 1000);
  };

  const handleCancel = () => {
    setIsVisible(false);
    clinkForm.resetFields();
    bookmarkForm.resetFields();
  };

  const switchForm = (key) => {
    setForm(key);
  }

  return (
    <div>
      <Button className="new-button" type="primary" icon={<PlusOutlined />} onClick={showModal}>
        New</Button>
      <Modal
        visible={isVisible}
        onCancel={handleCancel}
        footer={[
          <Button key="back" onClick={handleCancel}>
            Cancel
          </Button>,
          <Button form={form} htmlType="submit" key="submit" type="primary" loading={isLoading} >
            Submit
          </Button>,
        ]}>
        <Tabs defaultActiveKey={form} onChange={switchForm} >
          <TabPane tab="Bookmark" key="bookmark">
            <Form
              layout="vertical"
              form={bookmarkForm}
              name="bookmark"
              initialValues={{
                remember: false,
              }}
              onFinish={onBookmarkFinish}
            >
              <Form.Item
                label="Link"
                name="link"
                rules={[
                  {
                    required: true,
                    message: 'Please input a valid link for your bookmark!',
                    pattern: new RegExp('^(?:[a-z]+:)?//', 'i'),
                  },
                ]}
              >
                <Input defaultValue="https://www." />
              </Form.Item>
              <Form.Item
                label="Title"
                name="title"
                rules={[
                  {
                    required: true,
                    message: 'Please input a title for your bookmark!',
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
                    required: false
                  },
                ]}
              >
                <Input />
              </Form.Item>
              <Form.Item
                label="Add to Clinks"
                name="toAdd"
                rules={[
                  {
                    required: false
                  },
                ]}
              >
                <Select mode="multiple">
                  {writeClinks.map(item => (
                    <Option value={item.id}>{item.title}</Option>
                  ))}
                </Select>
              </Form.Item>
            </Form>
          </TabPane>
          <TabPane tab="Clink" key="clink">
            <Form
              layout="vertical"
              form={clinkForm}
              name="clink"
              initialValues={{
                remember: false,
              }}
              onFinish={onClinkFinish}
            >
              <Form.Item
                label="Clink Title"
                name="clinkTitle"
                rules={[
                  {
                    required: true,
                    message: 'Please input a title for your clink!',
                  },
                ]}
              >
                <Input />
              </Form.Item>
              <Form.Item
                label="Privacy"
                name="privacy"
                rules={[
                  {
                    required: false
                  },
                ]}>
                <Switch checkedChildren="Private" unCheckedChildren="Public" defaultUnchecked />
              </Form.Item>
            </Form>
          </TabPane>
        </Tabs>
      </Modal>
    </div>
  );
};

export default NewButton;
