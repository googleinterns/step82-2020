import React from 'react';
import 'antd/dist/antd.css';
import '../../index.css';
import { Layout, Collapse } from 'antd';
import { useSelector, useDispatch } from 'react-redux';
import Sidebar from '../Common/sidebar';
import Topbar from '../Common/topbar';
import ClinkMenu from '../Common/clinkmenu';

const { Content, Footer } = Layout;
const { Panel } = Collapse;


const Users = () => {
  const clinks = useSelector(state => state.clink.clinks);
  console.log(clinks)

  return (
    <Layout>
      <Sidebar />
      <Layout className="site-layout">
        <Topbar />
        <Content style={{ position: 'relative', margin: '24px 16px 0', overflow: 'initial' }}>
          <div className="site-layout-background" style={{ padding: '24px', textAlign: 'center' }}>
          <h1 className="user-title">Public</h1>
          {clinks.map(clink => (

            <>
            {!clink.private &&
              <>
                <Collapse accordion className="card" bordered={false}>
                  <Panel style={{ border: '0px'}} showArrow={false} header={ <div className="card-header">{clink.title}<ClinkMenu /></div>}>
                  </Panel>
                </Collapse>
                <br />
              </>
            }
           </>
          ))}
          <h1 className="user-title">Private</h1>
          </div>
        </Content>
        <Footer style={{ textAlign: 'center' }}>Clink</Footer>
      </Layout>
    </Layout>
  );
}

export default Users;
