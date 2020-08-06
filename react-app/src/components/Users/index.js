import React, { useEffect } from 'react';
import 'antd/dist/antd.css';
import '../../index.css';
import { useHistory, useParams } from 'react-router-dom';
import { checkUser, fetchUsername } from '../../features/users';
import { Layout, Spin } from 'antd';
import { useSelector, useDispatch } from 'react-redux';
import Sidebar from '../Common/sidebar';
import Topbar from '../Common/topbar';
import ClinkMenu from '../Common/clinkmenu';
import SaveClinkMenu from '../Common/saveclink';
import { setCurrClink, setTitle, fetchOtherClinks } from '../../features/clink'


const { Content, Footer } = Layout;

const Users = () => {

  var clinks = useSelector(state => state.clink.clinks);

  const currentToken = localStorage.getItem('currentToken');
  const currentUser = useSelector(state => state.users.currentUser);
  const isCurrentUserFetched = useSelector(state => state.users.isCurrentUserFetched);
  const isFetchingUser = useSelector(state => state.users.isFetchingUser);
  const otherClinks = useSelector(state => state.clink.otherClinks);
  const authorizationError = useSelector(state => state.users.authorizationError);
  const history = useHistory();
  const writeClinks = useSelector(state => state.clink.writeClinks);
  const urlString = new URLSearchParams(history.location.search);
  const urlParam = urlString.get("search") || "";
  const userId = useParams().userId;
  const isMyPage = parseInt(userId) === parseInt(currentUser);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(checkUser());
    if (isCurrentUserFetched) {
      dispatch(setTitle("User Page"));
      if (parseInt(userId) !== parseInt(currentUser)) {
        dispatch(fetchOtherClinks(userId));
        dispatch(fetchUsername(userId));
        clinks = otherClinks;
      }
    }
  }, [isCurrentUserFetched]);

  if (!isMyPage) {
    clinks = otherClinks;
  };

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
    if (parseInt(userId) === parseInt(currentUser)) {
      history.push(`/dashboard/${id}`);
    } else {
      history.push(`/dashboard/${id}/${userId}`);
    }
  };

  const checkClink = (clinkId) => {
    var filtered = writeClinks.filter(item => (item.id) === (clinkId));
    return isMyPage && (filtered.length > 0);
  };

  return (
    <Layout>
      <Sidebar />
      <Layout className="site-layout">
        <Topbar />
        <Content style={{ position: 'relative', margin: '24px 16px 0', marginLeft: '266px', overflow: 'auto', height: '67vh', maxHeight: '67vh' }}>
          <div className="site-layout-background" style={{ padding: '24px', textAlign: 'center', minHeight: '67vh' }}>
            <h1 className="user-title">Public</h1>
            {clinks.filter(clink => clink.title.toLowerCase().includes(urlParam.toLowerCase())).map(clink => (<>
              {!clink.private &&
                <div key={clink.id}>
                  <div className="clink-card">
                    <div className="card-header" >
                      <div style={{ width: "100%", cursor: "pointer" }} onClick={() => changeClink(clink.title, clink.id)}>
                        {clink.title}
                      </div>
                      {(checkClink(clink.id)) && <ClinkMenu menuClass="ellipsis-card-button" title={clink.title} id={clink.id} users={true} />}
                      {(!checkClink(clink.id)) && <SaveClinkMenu clink={clink.id} menuClass="ellipsis-card-button" display="unsave" />}
                      {!isMyPage && <SaveClinkMenu clink={clink.id} menuClass="ellipsis-card-button" />}
                    </div>
                  </div>
                  <br />
                </div>
              }</>
            ))}
            {isMyPage && <>
              <h1 className="user-title">Private</h1>
              {clinks.filter(clink => clink.title.toLowerCase().includes(urlParam.toLowerCase())).map(clink => (<>
                {clink.private && <>
                  <div className="clink-card">
                    <div className="card-header">
                      <div style={{ width: "100%", cursor: "pointer" }} onClick={() => changeClink(clink.title, clink.id)}>
                        {clink.title}
                      </div>
                      <ClinkMenu menuClass="ellipsis-card-button" title={clink.title} id={clink.id} users={true} />
                    </div>
                  </div>
                  <br /></>
                }</>
              ))}</>
            }
          </div>
        </Content>
        <Footer style={{ textAlign: 'center', marginLeft: '250px' }}>Clink</Footer>
      </Layout>
    </Layout>
  );
};

export default Users;
