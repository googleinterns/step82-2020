import React, { useEffect } from 'react';
import 'antd/dist/antd.css';
import '../../index.css';
import { Layout, Button} from 'antd';
import { UserOutlined } from '@ant-design/icons';
import { logOut } from '../../features/users';
import { useDispatch, useSelector } from 'react-redux';
import { getCurrentUser } from '../../features/users';


const { Header } = Layout;

const Topbar = () => {

  const dispatch = useDispatch()

  const user = useSelector(state => state.users.currentUser)
  useEffect(() => {
    dispatch(getCurrentUser())
  }, []);

  console.log("user: " + user)
  const logout = values => {
    console.log('logout clicked')
    console.log(values)
    dispatch(logOut(user))
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