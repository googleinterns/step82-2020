import React from 'react';
import { useSelector } from 'react-redux';
import 'antd/dist/antd.css';
import '../../index.css';
import { Layout, Input, Dropdown, Menu } from 'antd';
import { UserOutlined } from '@ant-design/icons';

const { Header } = Layout;
const { Search } = Input;

const Topbar = () => {

  const currentUser = useSelector(state => state.users.currentUser)

  const menu = (
    <Menu>
      <Menu.Item key="userID">
        User ID: {currentUser}
      </Menu.Item>
    </Menu>
  );

  return (
    <Header className="topbar">
      <div className="topbar-searchbar-wrapper">
        <div className="topbar-searchbar-container">
          <Search
            className="topbar-search"
            placeholder="Search in Title..."
            onSearch={value => console.log(value)}
          />
          <Dropdown.Button className="topbar-button" overlay={menu} icon={<UserOutlined />} onClick /* trigger={['click']} */> 
            Logout
          </Dropdown.Button> 
        </div>
      </div>
      <h1 className="topbar-title">TITLE</h1>
    </Header>
  )
}

export default Topbar;