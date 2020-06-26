import React from 'react';
import 'antd/dist/antd.css';
import '../../index.css';
import { Layout, Menu, Input, Button } from 'antd';
import { UserOutlined } from '@ant-design/icons';

const { Header } = Layout;
const { Search } = Input;

const Topbar = () => {
  return (
    <Header className="topbar-wrapper">
      <Menu theme="dark" mode="inline">
        <Search
          placeholder="Search in Title..."
          onSearch={value => console.log(value)}
          className="top-search"
        />
        <UserOutlined className="top-options" />
        <Button className="top-options" type="primary">Log out</Button>
      </Menu>
      <Menu theme="dark" mode="inline">
        <h1>TITLE</h1>
      </Menu>
    </Header>
  )
}

export default Topbar;