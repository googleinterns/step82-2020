import React from 'react';
import 'antd/dist/antd.css';
import '../../index.css';
import { Layout, Menu } from 'antd';
import ClinkModal from './clinkmodal';
import NewModalButton from './newmodalbutton';

const { Sider } = Layout;

const Sidebar = () => {
  return (
    <Sider className="sidebar">
      <Menu theme="dark" mode="inline">
        <div className="logo" />
        <ClinkModal render={modal => (<NewModalButton modal={modal} />)} />
      </Menu>
      <Menu className = "sidebar-scroll" theme="dark" mode="inline" defaultSelectedKeys={['all']} >
        <Menu.Item key="all">
          All
        </Menu.Item>
        <Menu.Item key="1">
          Clink 1
        </Menu.Item>
        <Menu.Item key="2">
          Clink 2
        </Menu.Item>
        <Menu.Item key="3">
          Clink 3
        </Menu.Item>
        <Menu.Item key="4">
          Clink 4
        </Menu.Item>
        <Menu.Item key="5">
          Clink 5
        </Menu.Item>
        <Menu.Item key="6">
          Clink 6
        </Menu.Item>
        <Menu.Item key="7">
          Clink 7
        </Menu.Item>
        <Menu.Item key="8">
          Clink 8
        </Menu.Item>
        <Menu.Item key="9">
          Clink 9
        </Menu.Item>
        <Menu.Item key="10">
          Clink 10
        </Menu.Item>
        <Menu.Item key="11">
          Clink 11
        </Menu.Item>
        <Menu.Item key="12">
          Clink 12
        </Menu.Item>
        <Menu.Item key="13">
          Clink 13
        </Menu.Item>
        <Menu.Item key="14">
          Clink 14
        </Menu.Item>
        <Menu.Item key="15">
          Clink 15
        </Menu.Item>
        <Menu.Item key="16">
          Clink 16
        </Menu.Item>
        <Menu.Item key="17">
          Clink 17
        </Menu.Item>
        <Menu.Item key="18">
          Clink 18
        </Menu.Item>
      </Menu>
    </Sider >
  )
}

export default Sidebar;