import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addClink, addBookmark } from '../../features/clink';
import 'antd/dist/antd.css';
import '../../index.css';
import { PlusOutlined } from '@ant-design/icons';
import { message, Modal, Tabs, Button, Form, Input, Select, Switch } from 'antd';

const { Option } = Select;
const { TabPane } = Tabs;

const NewButton = () => {

  const dispatch = useDispatch()
  const [bookmarkForm] = Form.useForm()
  const [clinkForm] = Form.useForm()
  const key = "formFeedback"

  const [visible, setIsVisible] = useState(false);
  const [loading, setIsLoading] = useState(false);
  const [form, setForm] = useState('bookmark');

  const showModal = () => {
    setIsVisible(true);
  };

  const onBookmarkFinish = values => {
    setIsLoading(true);
    if (!values.description) {
      values.description = ' ';
    }
    dispatch(addBookmark(values.link, values.title, values.description, values.toAdd, addSuccess, addFail))
    bookmarkForm.resetFields()
    setTimeout(() => {
      setIsLoading(false);
      setIsVisible(false);
    }, 3000);
  };

  const onClinkFinish = values => {
    setIsLoading(true);
    dispatch(addClink(values.clinkTitle, addSuccess, addFail))
    clinkForm.resetFields()
    setTimeout(() => {
      setIsLoading(false);
      setIsVisible(false);
    }, 3000);
  };

  const addSuccess = () => {
    setTimeout(() => {
      message.success({ content: 'Successfully added clink.', key, duration: 2} );
    }, 1000)
  }


  const addFail = (error) => {
    setTimeout(() => {
      message.error({ content: error, key, duration: 2});
    }, 1000)
  }

  const onFinishFailed = errorInfo => {
    setTimeout(() => {
      message.error({ content: errorInfo, key, duration: 2});
    }, 1000)
  };

  const handleCancel = () => {
    setIsVisible(false);
    clinkForm.resetFields()
    bookmarkForm.resetFields()
  };

  const switchForm = (key) => {
    setForm(key);
  }

  return (
    <div>
      <Button className="new-button" type="primary" icon={<PlusOutlined />} onClick={showModal}>
        New</Button>
      <Modal
        visible={visible}
        onCancel={handleCancel}
        footer={[
          <Button key="back" onClick={handleCancel}>
            Cancel
          </Button>,
          <Button form={form} htmlType="submit" key="submit" type="primary" loading={loading} >
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
              onFinishFailed={onFinishFailed}
            >
              <Form.Item
                label="Link"
                name="link"
                rules={[
                  {
                    required: true,
                    message: 'Please input a link for your bookmark!',
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
                    required: true
                  },
                ]}
              >
                <Select mode="multiple" defaultValue="All">
                  <Option value="All">All</Option>
                  <Option value="clink1">Clink 1</Option>
                  <Option value="clink2">Clink 2</Option>
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
              onFinishFailed={onFinishFailed}
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
  )
}

export default NewButton