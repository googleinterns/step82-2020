import React, {useEffect} from 'react';
import 'antd/dist/antd.css';
import '../../index.css';
import { useHistory } from 'react-router-dom';
import { checkUser } from '../../features/users';
import { Layout, Collapse, Spin } from 'antd';
import { useSelector, useDispatch } from 'react-redux';
import Sidebar from '../Common/sidebar';
import Topbar from '../Common/topbar';
import ClinkMenu from '../Common/clinkmenu';

const { Content, Footer } = Layout;
const { Panel } = Collapse;

const Users = () => {

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(checkUser())
  }, []);

  const currentToken = localStorage.getItem('currentToken')
  const currentUser = useSelector(state => state.users.currentUser)
  const isFetchingUser = useSelector(state => state.users.isFetchingUser)
  const clinks = useSelector(state => state.clink.clinks);
  const authorizationError = useSelector(state => state.users.authorizationError)

  const history = useHistory()

  if (isFetchingUser) return (
    <div className="center-load">
      <Spin size="large" />
    </div>
  )

  if ((!currentUser && !currentToken) || (authorizationError && !isFetchingUser)) {
    history.push("/get-started/login")
  }
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
