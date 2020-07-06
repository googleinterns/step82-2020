import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom'
import { getCurrentUser } from '../../features/users';
import 'antd/dist/antd.css';
import '../../index.css';
import { Layout } from 'antd';
import Sidebar from '../Common/sidebar';
import Topbar from '../Common/topbar';

const { Content, Footer } = Layout;

const Dashboard = () => {

  const dispatch = useDispatch()

  const user = useSelector(state => state.users.currentUser)
  const userFetched = useSelector(state => state.users.isCurrentUserFetched)

  useEffect(() => {
    dispatch(getCurrentUser())
  }, []);

  console.log(user)
  console.log(userFetched)

  if(!userFetched) return <div/>

  if(!user && userFetched) {
    history.push("/get-started")
  }
  
  return (
    <Layout>
      <Sidebar />
      <Layout className="site-layout">
      <Topbar />
        <Content style={{ position: 'relative', margin: '24px 16px 0', overflow: 'initial' }}>
          <div className="site-layout-background" style={{ padding: '24px', textAlign: 'center' }}>

          </div>
        </Content>
        <Footer style={{ textAlign: 'center' }}>Clink</Footer>
      </Layout>
    </Layout>
  );
}

export default Dashboard;
