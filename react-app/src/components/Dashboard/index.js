import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom'
import { getCurrentUser } from '../../features/users';
import 'antd/dist/antd.css';
import '../../index.css';
import { Layout } from 'antd';
import Sidebar from '../Common/sidebar';
import Topbar from '../Common/topbar';
import Card from '../Common/card';

const { Content, Footer } = Layout;

const Dashboard = () => {

  const dispatch = useDispatch()

  const token = useSelector(state => state.users.currentToken)
  const userFetched = useSelector(state => state.users.isCurrentUserFetched)

  useEffect(() => {
    dispatch(getCurrentUser())
  }, []);
  
  const history = useHistory()

  if(!userFetched) return <div/>

  if(!token && userFetched) {
    history.push("/get-started")
  }
  
  return (
    <Layout>
      <Sidebar />
      <Layout className="site-layout">
      <Topbar />
        <Content style={{ position: 'relative', margin: '24px 16px 0', overflow: 'initial' }}>
          <div className="site-layout-background" style={{ padding: '24px' }}>
          <Card />
          <br />
          <Card />
          <br />
          <Card />
          </div>
        </Content>
        <Footer style={{ textAlign: 'center' }}>Clink</Footer>
      </Layout>
    </Layout>
  );
}

export default Dashboard;
