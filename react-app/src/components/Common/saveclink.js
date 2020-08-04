import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addReadMap } from '../../features/clink'
import 'antd/dist/antd.css';
import '../../index.css';
import { EllipsisOutlined } from '@ant-design/icons';
import { Menu, Dropdown, Button, Modal } from 'antd';
import { ExclamationCircleOutlined } from '@ant-design/icons';


const SaveClinkMenu = (props) => {

  const dispatch = useDispatch();
  const currentUser = useSelector(state => state.users.currentUser)
  const { confirm } = Modal;

  var menu = (
    <Menu>
      <Menu.Item key="save" onClick={showSaveConfirm}>
        Save
      </Menu.Item>
    </Menu>  
  );

  if (props.display === "unsave") {
    menu = (
      <Menu>
        <Menu.Item key="edit">
          Unsave
        </Menu.Item>
      </Menu>
    );
  }
  
  function showSaveConfirm() {
    confirm({
      title: 'Do you want to save this clink?',
      icon: <ExclamationCircleOutlined />,
      content: 'You will have read access to this clink.',
      onOk() {
        dispatch(addReadMap(props.clink, currentUser));
        return new Promise((resolve, reject) => {
          setTimeout(Math.random() > 0.5 ? resolve : reject, 1000);
        }).catch(() => console.log('Oops errors!'));
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
