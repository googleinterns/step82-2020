import React from 'react';
import 'antd/dist/antd.css';
import '../../index.css';
import { Layout, Input, Button } from 'antd';
import { UserOutlined } from '@ant-design/icons';

const { Header } = Layout;
const { Search } = Input;

const Topbar = () => {

  return (
    <Header className="topbar">
      <div className="topbar-searchbar-wrapper">
        <div className="topbar-searchbar-container">
          <Search
            className="topbar-search"
            placeholder="Search in Title..."
            onSearch={value => console.log(value)}
          />
          <Button className="topbar-button" type="primary">Log Out</Button>
          <UserOutlined className="topbar-user-icon" />
        </div>
      </div>
      <h1 className="topbar-title">TITLE</h1>
    </Header>
  )
}

export default Topbar;