import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { logOut } from '../../features/users';
import { clearClinksAndBookmarks } from '../../features/clink';
import 'antd/dist/antd.css';
import '../../index.css';
import { Layout, Input, Dropdown, Menu, AutoComplete } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import ClinkMenu from './clinkmenu';
import { useHistory } from 'react-router-dom';

const { Header } = Layout;
const { Search } = Input;

const Topbar = () => {

  const currentToken = localStorage.getItem('currentToken');
  const title = useSelector(state => state.clink.currentClinkTitle);
  const currentUser = useSelector(state => state.users.currentUser);
  const bookmarks = useSelector(state => state.clink.bookmarks);
  const clinks = useSelector(state => state.clink.clinks);

  const dispatch = useDispatch();
  const history = useHistory();

  const logout = () => {
    dispatch(logOut(currentToken));
    dispatch(clearClinksAndBookmarks());
  };

  const menu = (
    <Menu>
      <Menu.Item key="user-page" onClick={(() => history.push(`/users/${currentUser}`))}>
        View Profile
      </Menu.Item>
    </Menu>
  );

  let menuDisplay = <ClinkMenu key={title} />;
  if (title === "All" || title === "User Page") {
    menuDisplay = <div />
  };

  const [options, setOptions] = useState([]);

  const setValue = (arr, searchText) => {
    var filtered = arr.filter(item => item.title.toLowerCase().includes(searchText.toLowerCase()));
    var value = [];
    for (var item of filtered) {
      value = [{ value: item.title }, ...value];
    };
    return value;
  }

  const onSearch = (searchText) => {
    if (title === "User Page") {
      setOptions(
        !searchText ? [] : setValue(clinks, searchText),
      );
    } else {
      setOptions(
        !searchText ? [] : setValue(bookmarks, searchText),
      );
    };
  };

  const onSearchFinished = (value) => {
    history.location.search = `search=${value}`; 
    history.push(history.location)
  };

  return (
    <Header className="topbar">
      <div className="topbar-searchbar-wrapper">
        <div className="topbar-searchbar-container">
          <AutoComplete className="topbar-search" options={options} onSearch={onSearch} onSelect={onSearchFinished}>
            <Search
              allowClear
              placeholder={"Search in " + title + "..."}
              onSearch={onSearchFinished}
            />
          </AutoComplete>
          <Dropdown.Button className="topbar-dropdown-user-logout-button" overlay={menu} icon={<UserOutlined />} onClick={logout} trigger={['click']}>
            Log Out
          </Dropdown.Button>
        </div>
      </div>
      <h1 className="topbar-title">{title} {menuDisplay}</h1>
    </Header>
  );
};

export default Topbar;
