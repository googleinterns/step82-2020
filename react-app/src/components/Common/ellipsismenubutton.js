import React from 'react';
import 'antd/dist/antd.css';
import '../../index.css';
import { EllipsisOutlined } from '@ant-design/icons';
import { Menu, Dropdown, Button } from 'antd';
import ClinkModal from './clinkmodal';
import ShareModal from './sharemodal';

// interactions with clinks
class EllipsisMenuButton extends React.Component {
  render() {
    const menu = (<Menu>
      <Menu.Item key="edit" onClick={ClinkModal.showModal}>
        Edit
      </Menu.Item>
      <Menu.Item key="delete">
        Delete
      </Menu.Item>
      <Menu.Item key="share" onClick={ShareModal.showModal}>
        Share
      </Menu.Item>
    </Menu>);
    return (
      <Dropdown overlay={menu} trigger={['click']}>
        <Button icon={<EllipsisOutlined />} className="ant-dropdown-link" onClick={e => e.preventDefault()} />
      </Dropdown>
    );
  }
}

export default EllipsisMenuButton;
