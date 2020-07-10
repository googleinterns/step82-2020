import React from 'react';
import 'antd/dist/antd.css';
import '../../index.css';
import { PlusOutlined } from '@ant-design/icons';
import { Modal, Tabs, Button, Form, Input, Select } from 'antd';

const { Option } = Select;
const { TabPane } = Tabs;

class NewButton extends React.Component {
  constructor(props) {
    super(props);
    this.state = { loading: false, visible: false, form: 'bookmark' };
  }

  showModal = () => {
    this.setState({
      visible: true,
    });
  };

  onFinish = values => {
    this.setState({ loading: true })
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

  switchForm = () => {
    if (this.state.form==='bookmark') {
      this.setState({ form: 'clink' });
    } else {
      this.setState({ form: 'bookmark' });
    }
  }

  render() {
    const { loading, visible, form } = this.state;
    return (
      <>
        <Button className="new-button" type="primary" icon={<PlusOutlined />} onClick={this.showModal}>
      New</Button>
        <Modal 
        visible={visible}
        onCancel={this.handleCancel}
        footer={[
          <Button key="back" onClick={this.handleCancel}>
            Cancel
          </Button>,
          <Button form={form} htmlType="submit" key="submit" type="primary" loading={loading} >
            Submit
          </Button>,
        ]}>
          <Tabs defaultActiveKey="bookmark" onChange={this.switchForm} >
            <TabPane tab="Bookmark" key="bookmark">
              <Form
                {...{ layout: 'vertical' }}
                name="bookmark"
                initialValues={{
                  remember: false,
                }}
                onFinish={this.onFinish}
                onFinishFailed={this.onFinishFailed}
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
                {...{layout: 'vertical'}}
                name="clink"
                initialValues={{
                  remember: false,
                }}
                onFinish={this.onFinish}
                onFinishFailed={this.onFinishFailed}
              >
                <Form.Item
                  label="Clink Title"
                  name="clink title"
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
      </>
    );
  }
}

export default NewButton;
