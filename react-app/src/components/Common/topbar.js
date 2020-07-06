import React from 'react';
import 'antd/dist/antd.css';
import '../../index.css';
import { useDispatch } from 'react-redux'
import { Layout, Input, Button} from 'antd';
import { UserOutlined } from '@ant-design/icons';
import { logOut } from '../../features/users';

const { Header } = Layout;
const { Search } = Input;

const Topbar = () => {

  const dispatch = useDispatch()

  const logout = values => {
    console.log('logout clicked')
    console.log(values)
    dispatch(logOut(values.username, values.password))
  };

  return (
    <Header className="topbar-wrapper">
      <Search
        placeholder="Search in Title..."
        onSearch={value => console.log(value)}
        className="top-search"
      />
      <UserOutlined className="top-icon" />
      <Button className="top-button" type="primary" onClick={logout}>Log Out</Button>
      <h1>TITLE</h1>
    </Header>
  )
}

export default Topbar;