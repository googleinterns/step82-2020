import React, { useEffect } from 'react';
import 'antd/dist/antd.css';
import '../../index.css';
import { useHistory, useParams } from 'react-router-dom';
import { checkUser } from '../../features/users';
import { Layout, Spin } from 'antd';
import { useSelector, useDispatch } from 'react-redux';
import Sidebar from '../Common/sidebar';
import Topbar from '../Common/topbar';
import ClinkMenu from '../Common/clinkmenu';
import { Link } from 'react-router-dom/cjs/react-router-dom.min';
import { setCurrClink, setTitle, fetchOtherClinks } from '../../features/clink'


const { Content, Footer } = Layout;

const Users = () => {

  const dispatch = useDispatch()
  const currentToken = localStorage.getItem('currentToken')
  const currentUser = useSelector(state => state.users.currentUser)
  const isFetchingUser = useSelector(state => state.users.isFetchingUser)
  var clinks = useSelector(state => state.clink.clinks);
  const otherClinks = useSelector(state => state.clink.otherClinks)
  const authorizationError = useSelector(state => state.users.authorizationError)
  const history = useHistory()

  const { userId } = useParams();
  console.log("USE PARAMS: " + userId)
  console.log("CURR USER: " + currentUser)

  useEffect(() => {
    dispatch(checkUser())
    dispatch(setTitle("User Page"))
    console.log("INSIDEEEE")
    console.log("USE PARAMS!!: " + userId)
    console.log("CURR USER: " + currentUser)
    dispatch(fetchOtherClinks(userId))
  }, []);

  if (userId !== currentUser) {
    clinks = otherClinks;
  }

  if (isFetchingUser) return (
    <div className="center-load">
      <Spin size="large" />
    </div>
  )

  if ((!currentUser && !currentToken) || (authorizationError && !isFetchingUser)) {
    history.push("/get-started/login")
  }

  const changeClink = (title, id) => {
    dispatch(setCurrClink(id))
    dispatch(setTitle(title))
  }

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
                <Link to={"/dashboard/" + clink.id} onClick={(() => changeClink(clink.title, clink.id))}>
                  <div className="clink-card">
                    <div className="card-header">
                      {clink.title} <ClinkMenu  menuClass="ellipsis-card-button"/>
                    </div>
                  </div>
                  <br />
                </Link>
              </>
            }
           </>
          ))}
          <h1 className="user-title">Private</h1>
          {clinks.map(clink => (
            <>
            {clink.private &&
              <>
                <Link to="/dashboard" onClick={(() => changeClink(clink.title, clink.id))}>
                  <div className="clink-card">
                    <div className="card-header">
                      {clink.title} <ClinkMenu menuClass="ellipsis-card-button"/>
                    </div>
                  </div>
                  <br />
                </Link>
              </>
            }
           </>
          ))}
          </div>
        </Content>
        <Footer style={{ textAlign: 'center' }}>Clink</Footer>
      </Layout>
    </Layout>
  );
};

export default Users;
