import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { logOut } from '../../features/users';
import 'antd/dist/antd.css';
import '../../index.css';
import { Layout, Input, Dropdown, Menu } from 'antd';
import { UserOutlined } from '@ant-design/icons';

const { Header } = Layout;
const { Search } = Input;

const Topbar = () => {

  const currentToken = localStorage.getItem('currentToken')
  const currentUser = useSelector(state => state.users.currentUser)
 
  const dispatch = useDispatch()

  const logout = () => {
    dispatch(logOut(currentToken))
  };

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
          <Dropdown.Button className="topbar-dropdown-user-logout-button" overlay={menu} icon={<UserOutlined />} onClick={logout} trigger={['click']}> 
            Log Out
          </Dropdown.Button> 
        </div>
      </div>
      <h1 className="topbar-title">TITLE</h1>
    </Header>
  )
}

export default Topbar;
