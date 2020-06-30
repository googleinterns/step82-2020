import React from 'react';
import 'antd/dist/antd.css';
import '../../index.css';
import { Layout, Input, Button} from 'antd';
import { UserOutlined } from '@ant-design/icons';

const { Header } = Layout;
const { Search } = Input;

const Topbar = () => {
  return (
    <Header className="topbar-wrapper">
      <Search
        placeholder="Search in Title..."
        onSearch={value => console.log(value)}
        className="top-search"
      />
      <UserOutlined className="top-icon" />
      <Button className="top-button" type="primary">Log Out</Button>
      <h1>TITLE</h1>
    </Header>
  )
}

export default Topbar;