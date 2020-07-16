import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchClinks } from '../../features/clink'
import 'antd/dist/antd.css';
import '../../index.css';
import { Layout, Menu } from 'antd';
import NewButton  from './newbutton';


const { Sider } = Layout;

const Sidebar = () => {

  const currentToken = localStorage.getItem('currentToken');
  const clinks = useSelector(state => state.clink.clinks);
  const isCurrentUserFetched = useSelector(state => state.users.isCurrentUserFetched);

  const dispatch = useDispatch();

  useEffect(() => {
    if (isCurrentUserFetched) {
      dispatch(fetchClinks(currentToken));
    }
  }, []);

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
        
        {clinks.map(item => (
          <Menu.Item key={item.id}>{item.title}</Menu.Item>
        ))}
      </Menu>
    </Sider >
  )
}

export default Sidebar;