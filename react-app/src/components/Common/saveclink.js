import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchUsers } from '../../features/users';
import { addReadMap } from '../../features/clink'
import 'antd/dist/antd.css';
import '../../index.css';
import { EllipsisOutlined } from '@ant-design/icons';
import { Menu, Dropdown, Button, Modal, Form } from 'antd';


const layout = {
  layout: 'vertical'
};

const SaveClinkMenu = (props) => {

  const currentToken = localStorage.getItem('currentToken');
  const isCurrentUserFetched = useSelector(state => state.users.isCurrentUserFetched);
  const dispatch = useDispatch();
  const currentUser = useSelector(state => state.users.currentUser)

  const [isLoading, setLoading] = useState(false);
  const [editIsVisible, setEditVisible] = useState(false);

  const [confirmForm] = Form.useForm();

  useEffect(() => {
    if (isCurrentUserFetched) {
      dispatch(fetchUsers(currentToken));
    }
  }, []);

  const showSave = () => {
    setEditVisible(true);
  };

  const onSaveFinish = () => {
    dispatch(addReadMap(props.clink, currentUser))
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setEditVisible(false);
    }, 3000);
    confirmForm.resetFields();
    window.location.reload(false);
  };
  const onFinishFailed = errorInfo => {
    console.log('Failed:', errorInfo);
  };

  const handleCancel = () => {
    confirmForm.resetFields();
    setEditVisible(false);
  };

  const menu = (
    <Menu>
      <Menu.Item key="edit" onClick={showSave}>
        Save
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
    </>
  );
};

export default SaveClinkMenu;
