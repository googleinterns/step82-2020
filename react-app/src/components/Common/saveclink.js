import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addReadMap } from '../../features/clink';
import { EllipsisOutlined } from '@ant-design/icons';
import { Menu, Dropdown, Button, Modal } from 'antd';
import { ExclamationCircleOutlined } from '@ant-design/icons';


const SaveClinkMenu = (props) => {

  const dispatch = useDispatch();
  const currentUser = useSelector(state => state.users.currentUser)
  const { confirm } = Modal;

  const menu = (
    <Menu>
      <Menu.Item key="save" onClick={showConfirm}>
        Save
      </Menu.Item>
    </Menu>  
  );

  function showConfirm() {
    confirm({
      title: 'Do you want to save this clink?',
      icon: <ExclamationCircleOutlined />,
      content: 'You will have read access to this clink.',
      onOk() {
        return dispatch(addReadMap(props.clink, currentUser));
      },
      onCancel() {},
    });
  }

  return (
    <>
      <Dropdown overlay={menu} trigger={['click']} className={props.menuClass}>
        <Button icon={<EllipsisOutlined />} type="link" className="ant-dropdown-link" onClick={(e) => e.preventDefault()} />
      </Dropdown>
    </>
  );
};

export default SaveClinkMenu;