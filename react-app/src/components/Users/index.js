import React, {useEffect} from 'react';
import 'antd/dist/antd.css';
import '../../index.css';
import { useHistory } from 'react-router-dom';
import { checkUser } from '../../features/users';
import { Layout, Spin } from 'antd';
import { useSelector, useDispatch } from 'react-redux';
import Sidebar from '../Common/sidebar';
import Topbar from '../Common/topbar';
import ClinkMenu from '../Common/clinkmenu';
import { Link } from 'react-router-dom/cjs/react-router-dom.min';
import { setCurrClink, setTitle } from '../../features/clink'


const { Content, Footer } = Layout;

const Users = () => {

  const currentToken = localStorage.getItem('currentToken');
  const currentUser = useSelector(state => state.users.currentUser);
  const isFetchingUser = useSelector(state => state.users.isFetchingUser);
  const clinks = useSelector(state => state.clink.clinks);
  const authorizationError = useSelector(state => state.users.authorizationError);
  
  const dispatch = useDispatch();
  const history = useHistory();

  const urlString = new URLSearchParams(history.location.search);
  const urlParam = urlString.get("search") || "";

  useEffect(() => {
    dispatch(checkUser());
    dispatch(setTitle("User Page"));
  }, []);

  if (isFetchingUser) return (
    <div className="center">
      <Spin size="large" />
    </div>
  );

  if ((!currentUser && !currentToken) || (authorizationError && !isFetchingUser)) {
    history.push("/get-started/login");
  };

  const changeClink = (title, id) => {
    dispatch(setCurrClink(id));
    dispatch(setTitle(title));
  };

  return (
    <Layout>
      <Sidebar />
      <Layout className="site-layout">
        <Topbar />
        <Content style={{ position: 'relative', margin: '24px 16px 0', overflow: 'auto', height: '65vh' }}>
          <div className="site-layout-background" style={{ padding: '24px', textAlign: 'center', minHeight: '65vh' }}>
          <h1 className="user-title">Public</h1>
          {clinks.filter(clink => clink.title.toLowerCase().includes(urlParam.toLowerCase())).map(clink => (
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
          {clinks.filter(clink => clink.title.toLowerCase().includes(urlParam.toLowerCase())).map(clink => (
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
