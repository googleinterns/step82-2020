import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { logOut } from '../../features/users';
import { clearClinksAndBookmarks } from '../../features/clink';
import 'antd/dist/antd.css';
import '../../index.css';
import { Layout, Input, Dropdown, Menu } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import ClinkMenu from './clinkmenu';
import { useHistory, useParams } from 'react-router-dom';

const { Header } = Layout;
const { Search } = Input;

const Topbar = () => {

  const currentToken = localStorage.getItem('currentToken');
  const title = useSelector(state => state.clink.currentClinkTitle);
  const history = useHistory();
  const currentUser = useSelector(state => state.users.currentUser)
  var username = useSelector(state => state.users.username);
  const dispatch = useDispatch();
  const userId = useParams();

  const logout = () => {
    dispatch(logOut(currentToken));
    dispatch(clearClinksAndBookmarks());
  };

  if (userId === currentUser) {
    username = "My "
  } else {
    username += "'s ";
  }

  const menu = (
    <Menu>
      <Menu.Item key="user-page" onClick={(() => history.push(`/users/${currentUser}`))}>
        View Profile
      </Menu.Item>
    </Menu>
  );

  let menuDisplay = <ClinkMenu key={title}/>;
  if (title === "All" || title === "User Page") {
    menuDisplay = <div />
  };

  return (
    <Header className="topbar">
      <div className="topbar-searchbar-wrapper">
        <div className="topbar-searchbar-container">
          <Search
            className="topbar-search"
            placeholder={"Search in " + title + "..."}
            onSearch={value => console.log(value)}
          />
          <Dropdown.Button className="topbar-dropdown-user-logout-button" overlay={menu} icon={<UserOutlined />} onClick={logout} trigger={['click']}> 
            Log Out
          </Dropdown.Button> 
        </div>
      </div>
      <h1 className="topbar-title">{username + title} {menuDisplay}</h1>
    </Header>
  );
};

export default Topbar;
