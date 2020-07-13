import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addClink } from '../../features/clink';
import 'antd/dist/antd.css';
import '../../index.css';
import { PlusOutlined } from '@ant-design/icons';
import { message, Modal, Tabs, Button, Form, Input, Select } from 'antd';

const { Option } = Select;
const { TabPane } = Tabs;

const NewButton = () => {

  const dispatch = useDispatch()
  const [bookmarkForm] = Form.useForm()
  const [clinkForm] = Form.useForm()
  const key = "formFeedback"

  const [state, setState] = useState({ loading: false, visible: false, form: 'bookmark' })

  const showModal = () => {
    setState({
      visible: true,
    });
  };

  const onBookmarkFinish = values => {
    console.log(values)
    setState({ loading: true })
    bookmarkForm.resetFields()
    setTimeout(() => {
      setState({ loading: false, visible: false });
    }, 3000);
  };

  const onClinkFinish = values => {
    console.log(values);
    setState({ loading: true })
    dispatch(addClink(values.clinkTitle, addSuccess, addFail))
    clinkForm.resetFields()
    setTimeout(() => {
      setState({ loading: false, visible: false });
    }, 3000);
  };

  const addSuccess = () => {
    console.log("add success")
    setTimeout(() => {
      message.success({ content: 'Successfully added.', key, duration: 2} );
    }, 1000)
  }


  const addFail = (error) => {
    console.log("add fail")
    setTimeout(() => {
      message.error({ content: error, key, duration: 2});
    }, 1000)
  }

  const onFinishFailed = errorInfo => {
    console.log('Failed:', errorInfo);
  };

  const handleCancel = () => {
    setState({ visible: false, form: 'bookmark' });
    clinkForm.resetFields()
    bookmarkForm.resetFields()
  };

  const switchForm = (key) => {
    setState({ visible: true, form: key });
  }

  return (
    <div>
      <Button className="new-button" type="primary" icon={<PlusOutlined />} onClick={showModal}>
        New</Button>
      <Modal
        visible={state.visible}
        onCancel={handleCancel}
        footer={[
          <Button key="back" onClick={handleCancel}>
            Cancel
          </Button>,
          <Button form={state.form} htmlType="submit" key="submit" type="primary" loading={state.loading} >
            Submit
          </Button>,
        ]}>
        <Tabs defaultActiveKey={state.form} onChange={switchForm} >
          <TabPane tab="Bookmark" key="bookmark">
            <Form
              {...{ layout: 'vertical' }}
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
                name="add"
                rules={[
                  {
                    required: false
                  },
                ]}
              >
                <Select mode="multiple" defaultValue="All">
                  <Option value="All">All</Option>
                </Select>
              </Form.Item>
            </Form>
          </TabPane>
          <TabPane tab="Clink" key="clink">
            <Form
              {...{ layout: 'vertical' }}
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
            </Form>
          </TabPane>
        </Tabs>
      </Modal>
    </div>
  )
}

export default NewButton