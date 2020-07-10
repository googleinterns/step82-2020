import React from 'react';
import { logOut } from '../../features/users';
import { useDispatch } from 'react-redux';
import 'antd/dist/antd.css';
import '../../index.css';
import { Layout, Button} from 'antd';
import { UserOutlined } from '@ant-design/icons';


const { Header } = Layout;

const Topbar = () => {

  const currentToken = localStorage.getItem('currentToken')

  const dispatch = useDispatch()

  const logout = () => {
    dispatch(logOut(currentToken))
  };

  return (
    <Header className="topbar-wrapper">
      <UserOutlined className="top-icon" />
      <Button className="top-button" type="primary" onClick={logout}>Log Out</Button>
      <h1>TITLE</h1>
    </Header>
  )
}

export default Topbar;