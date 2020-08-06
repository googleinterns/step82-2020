import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { checkUser } from '../../features/users';
import 'antd/dist/antd.css';
import '../../index.css';
import { Layout, Spin } from 'antd';
import Sidebar from '../Common/sidebar';
import Topbar from '../Common/topbar';
import Card from '../Common/card';

const { Content, Footer } = Layout;

const Dashboard = () => {

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(checkUser());
  }, []);

  const currentToken = localStorage.getItem('currentToken');
  const currentUser = useSelector(state => state.users.currentUser);
  const isFetchingUser = useSelector(state => state.users.isFetchingUser);
  const authorizationError = useSelector(state => state.users.authorizationError);

  const history = useHistory();

  if (isFetchingUser) return (
    <div className="center">
      <Spin size="large" />
    </div>
  );

  if ((!currentUser && !currentToken) || (authorizationError && !isFetchingUser)) {
    history.push("/get-started/login");
  };

  return (
    <Layout>
      <Sidebar />
      <Layout className="site-layout">
        <Topbar />
        <Content style={{ position: 'relative', margin: '24px 16px 0', marginLeft: '266px', overflow: 'auto', height: '67vh', maxHeight: '67vh' }}>
          <div className="site-layout-background" style={{ padding: '24px', minHeight: '67vh' }}>
          <Card />
          </div>
        </Content>
        <Footer style={{ textAlign: 'center', marginLeft: '250px' }}>Clink</Footer>
      </Layout>
    </Layout>
  );
};

export default Dashboard;
