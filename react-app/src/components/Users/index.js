import React from 'react';
import 'antd/dist/antd.css';
import '../../index.css';
import { Layout } from 'antd';
import Sidebar from '../Common/sidebar'

const { Header, Content, Footer } = Layout;

const Users = () => {
  return (
    <Layout>
      <Sidebar />
      <Layout className="site-layout" style={{ marginLeft: '200px' }}>
        <Header style={{ position: 'relative', height: '153px' }} />
        <Content style={{ position: 'relative', margin: '24px 16px 0', overflow: 'initial' }}>
          <div className="site-layout-background" style={{ padding: '24px', textAlign: 'center' }}>

          </div>
        </Content>
        <Footer style={{ textAlign: 'center' }}>Clink</Footer>
      </Layout>
    </Layout>
  );
}

export default Users;
