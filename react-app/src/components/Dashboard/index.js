import React from 'react';
import 'antd/dist/antd.css';
import '../../index.css';
import { Layout, Menu } from 'antd';
import { PlusOutlined } from '@ant-design/icons';


const { Header, Content, Footer, Sider } = Layout;
const Dashboard = () => {
    return (

    <Layout>
        <div>
            <Sider
            style={{               
                height: '17vh',
                position: 'relative',
                left: 0,
            }}
            >
            <div className="logo" />
            <Menu theme="dark" mode="inline">
                <Menu.Item key="new" icon={<PlusOutlined />}>
                New
                </Menu.Item>
            </Menu>
            </Sider>
            <Sider
            style={{
                overflow: 'auto',
                height: '83vh',
                position: 'fixed',
                left: 0,
            }}
            >
            <Menu theme="dark" mode="inline" defaultSelectedKeys={['all']}>
                <Menu.Item key="all">
                All
                </Menu.Item>
                <Menu.Item key="1">
                Clink 1
                </Menu.Item>
                <Menu.Item key="2">
                Clink 2
                </Menu.Item>
                <Menu.Item key="3">
                Clink 3
                </Menu.Item>
                <Menu.Item key="4">
                Clink 4
                </Menu.Item>
                <Menu.Item key="5">
                Clink 5
                </Menu.Item>
                <Menu.Item key="6">
                Clink 6
                </Menu.Item>
                <Menu.Item key="7">
                Clink 7
                </Menu.Item>
                <Menu.Item key="8">
                Clink 8
                </Menu.Item>
                <Menu.Item key="9">
                Clink 9
                </Menu.Item>
                <Menu.Item key="10">
                Clink 10
                </Menu.Item>
                <Menu.Item key="11">
                Clink 11
                </Menu.Item>
                <Menu.Item key="12">
                Clink 12
                </Menu.Item>
                <Menu.Item key="13">
                Clink 13
                </Menu.Item>
                <Menu.Item key="14">
                Clink 14
                </Menu.Item>
                <Menu.Item key="15">
                Clink 15
                </Menu.Item>
                <Menu.Item key="16">
                nav 16
                </Menu.Item>
                <Menu.Item key="17">
                Clink 17
                </Menu.Item>
                <Menu.Item key="18">
                Clink 18
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
