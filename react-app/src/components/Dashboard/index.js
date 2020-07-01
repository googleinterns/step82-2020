import React from 'react';
import 'antd/dist/antd.css';
import '../../index.css';
import { Layout } from 'antd';
import Sidebar from '../Common/sidebar';
import Topbar from '../Common/topbar';
import Card from '../Common/card';

const { Content, Footer } = Layout;

const Dashboard = () => {
  
  return (
    <Layout>
      <Sidebar />
      <Layout className="site-layout">
      <Topbar />
        <Content style={{ position: 'relative', margin: '24px 16px 0', overflow: 'initial' }}>
          <div className="site-layout-background" style={{ padding: '24px' }}>
          <Card />
          </div>
        </Content>
        <Footer style={{ textAlign: 'center' }}>Clink</Footer>
      </Layout>
    </Layout>
  );
}

export default Dashboard;
