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
        <div>
            <Sider
            style={{
                overflow: 'auto',
                height: '30vh',
                position: 'relative',
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
            <Sider
            style={{
                overflow: 'auto',
                height: '70vh',
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
                <Menu.Item key="4">
                nav 3
                </Menu.Item>
                <Menu.Item key="5">
                nav 3
                </Menu.Item>
                <Menu.Item key="6">
                nav 3
                </Menu.Item>
                <Menu.Item key="7">
                nav 3
                </Menu.Item>
                <Menu.Item key="8">
                nav 3
                </Menu.Item>
                <Menu.Item key="9">
                nav 3
                </Menu.Item>
                <Menu.Item key="10">
                nav 3
                </Menu.Item>
                <Menu.Item key="11">
                nav 3
                </Menu.Item>
                <Menu.Item key="12">
                nav 3
                </Menu.Item>
                <Menu.Item key="13">
                nav 3
                </Menu.Item>
                <Menu.Item key="14">
                nav 3
                </Menu.Item>
                <Menu.Item key="15">
                nav 3
                </Menu.Item>
                <Menu.Item key="16">
                nav 3
                </Menu.Item>
                <Menu.Item key="17">
                nav 3
                </Menu.Item>
                <Menu.Item key="18">
                nav 3
                </Menu.Item>
            </Menu>
            </Sider>
        </div>
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
