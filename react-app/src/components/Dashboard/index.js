import React from 'react';
import ReactDOM from 'react-dom';
import 'antd/dist/antd.css';
import '../../index.css';
import { Layout, Menu } from 'antd';
import PlusOutlined from '@ant-design/icons';


const { Header, Content, Footer, Sider } = Layout;
const Dashboard = () => {
    return (

    <Layout>
        <Sider
        style={{
            overflow: 'auto',
            height: '100vh',
            position: 'fixed',
            left: 0,
        }}
        >
        <div className="logo" />
        <Menu theme="dark" mode="inline" defaultSelectedKeys={['2']}>
            <Menu.Item key="1" icon={<PlusOutlined />}>
            nav 1
            </Menu.Item>
            <Menu.Item key="2">
            nav 2
            </Menu.Item>
            <Menu.Item key="3">
            nav 3
            </Menu.Item>
        </Menu>
        </Sider>
        <Layout className="site-layout" style={{ marginLeft: 200 }}>
        <Header className="site-layout-background" style={{ padding: 0 }} />
        <Content style={{ margin: '24px 16px 0', overflow: 'initial' }}>
            <div className="site-layout-background" style={{ padding: 24, textAlign: 'center' }}>
            
            </div>
        </Content>
        <Footer style={{ textAlign: 'center' }}>Clink</Footer>
        </Layout>
    </Layout>
    );
}

export default Dashboard;
