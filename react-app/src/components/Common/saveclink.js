import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addReadMap, unsave } from '../../features/clink'
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
      <Menu.Item key="save" onClick={showConfirm}>
        {props.display === "unsave" ? 'Unsave' : 'Save'}
      </Menu.Item>
    </Menu>  
  );
  var titleText = 'Do you want to save this clink?';
  var contentText = 'You will have read access to this clink.';

  if (props.display === "unsave") {
    titleText = 'Do you want to unsave this clink?';
    contentText = 'You will not have read access to this clink anymore.';
  }
  
  function showConfirm() {
    confirm({
      title: titleText,
      icon: <ExclamationCircleOutlined />,
      content: contentText,
      onOk() {
        if (props.display === "unsave") {
          return dispatch(unsave(props.clink, currentUser))
        } else {
          return dispatch(addReadMap(props.clink, currentUser));
        }
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