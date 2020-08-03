import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchUsers } from '../../features/users';
import { addReadMap, unsave } from '../../features/clink'
import 'antd/dist/antd.css';
import '../../index.css';
import { EllipsisOutlined } from '@ant-design/icons';
import { Menu, Dropdown, Button, Modal, Form } from 'antd';


const layout = {
  layout: 'vertical'
};

const SaveClinkMenu = (props) => {

  const dispatch = useDispatch();
  const currentUser = useSelector(state => state.users.currentUser)

  const [isLoading, setLoading] = useState(false);
  const [saveIsVisible, setSaveVisible] = useState(false);
  const [unsaveIsVisible, setUnsaveVisible] = useState(false);
  const [confirmForm] = Form.useForm();
  const [confirmUnsaveForm] = Form.useForm();

  const showSave = () => {
    setSaveVisible(true);
  };

  const showUnsave = () => {
    setUnsaveVisible(true);
  };

  const onSaveFinish = () => {
    dispatch(addReadMap(props.clink, currentUser))
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSaveVisible(false);
    }, 3000);
    confirmForm.resetFields();
    window.location.reload(false);
  };

  const onUnsaveFinish = () => {
    dispatch(unsave(props.clink, currentUser))
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setUnsaveVisible(false);
    }, 3000);
    confirmUnsaveForm.resetFields();
    window.location.reload(false);
  };

  const onFinishFailed = errorInfo => {
    console.log('Failed:', errorInfo);
  };

  const handleCancel = () => {
    confirmForm.resetFields();
    confirmUnsaveForm.resetFields();
    setSaveVisible(false);
    setUnsaveVisible(false);
  };

  var menu = (
    <Menu>
      <Menu.Item key="edit" onClick={showSave}>
        Save
      </Menu.Item>
    </Menu>
  );

  if (props.display === "unsave") {
    menu = (
      <Menu>
        <Menu.Item key="edit" onClick={showUnsave}>
          Unsave
        </Menu.Item>
      </Menu>
    );
  }

  return (
    <>
      <Dropdown overlay={menu} trigger={['click']} className={props.menuClass}>
        <Button icon={<EllipsisOutlined />} type="link" className="ant-dropdown-link" onClick={e => e.preventDefault()} />
      </Dropdown>
      <Modal visible={saveIsVisible} onCancel={handleCancel}
        footer={[
          <Button key="back" onClick={handleCancel}>
            No
          </Button>,
          <Button form="confirm-save" htmlType="submit" key="submit" type="primary" loading={isLoading} >
            Yes
          </Button>,
        ]}
      >
        <Form {...layout} name="confirm-save" onFinish={onSaveFinish} onFinishFailed={onFinishFailed}
          initialValues={{
            remember: false,
          }}
          form={confirmForm}
          style={{textAlign: "center"}}
        >
          <h1>Confirm save?</h1>
        </Form>
      </Modal>
      <Modal visible={unsaveIsVisible} onCancel={handleCancel}
        footer={[
          <Button key="back" onClick={handleCancel}>
            No
          </Button>,
          <Button form="confirm-unsave" htmlType="submit" key="submit" type="primary" loading={isLoading} >
            Yes
          </Button>,
        ]}
      >
        <Form {...layout} name="confirm-unsave" onFinish={onUnsaveFinish} onFinishFailed={onFinishFailed}
          initialValues={{
            remember: false,
          }}
          form={confirmUnsaveForm}
          style={{textAlign: "center"}}
        >
          <h1>Confirm unsave?</h1>
        </Form>
      </Modal>
    </>
  );
};

export default SaveClinkMenu;
