import React, { useState, useEffect } from 'react';
import 'antd/dist/antd.css';
import '../../index.css';
import { Layout, Menu } from 'antd';
import NewButton  from './newbutton';
import axios from "axios";

const { Sider } = Layout;

const Sidebar = () => {

  const [menuItems, setMenuItems] = useState([]);
  useEffect(() => {
    axios.get(`http://localhost:5000/apis/fetch-clinks`).then(
      (response) => {
        const allItems = response.data;
        console.log(response.data);
        setMenuItems(allItems);
    });
  });


  return (
    <Sider className="sidebar">
      <Menu theme="dark" mode="inline">
        <div className="logo" />
        <NewButton />
      </Menu>
      <Menu className="sidebar-scroll" theme="dark" mode="inline" defaultSelectedKeys={['all']} >
        <Menu.Item key="all">
          All
        </Menu.Item>
        
        {menuItems.map(item => (
          <Menu.Item key="1">{item.title}</Menu.Item>
        ))}
      </Menu>
    </Sider >
  )
}

export default Sidebar;