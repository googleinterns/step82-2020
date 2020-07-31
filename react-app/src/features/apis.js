import axios from 'axios';

const BASE_URL = 'http://localhost:5000/apis';	
const SIGNUP_URL = `${BASE_URL}/sign-up`;
const LOGIN_URL = `${BASE_URL}/login`;	
const LOGOUT_URL = `${BASE_URL}/logout`;
const GET_CURR_USER_URL = `${BASE_URL}/get-curr-user`;
const ADD_CLINK_URL = `${BASE_URL}/add-clink`;
const ADD_BOOKMARK_URL = `${BASE_URL}/add-bookmark`;
const FETCH_CLINKS_URL = `${BASE_URL}/fetch-clinks`;
const FETCH_WRITE_CLINKS_URL = `${BASE_URL}/fetch-write-clinks`;
const FETCH_BOOKMARKS_URL = `${BASE_URL}/fetch-bookmarks`;
const FETCH_ALL_USERS_URL = `${BASE_URL}/fetch-all-users`;
const FETCH_USERS_WRITE_URL = `${BASE_URL}/fetch-users-write`;
const SHARE_CLINK_URL = `${BASE_URL}/share-clink`;
const UNSHARE_CLINK_URL = `${BASE_URL}/unshare-clink`;
const FETCH_USERNAME_URL = `${BASE_URL}/fetch-username`;

const signUp = (email, username, password) => axios.post(SIGNUP_URL, {
  email: email,
  username: username,
  password: password
});

const login = (username, password, remember) => axios.post(LOGIN_URL, {
  username: username,
  password: password,
  remember: remember
});

const logout = (token) => axios.post(LOGOUT_URL, {
  Authorization: token
});

const checkUser = (token) => axios.get(GET_CURR_USER_URL, {
  headers: {'Authorization': token}
});

const addClink = (title, privacy, token) => axios.post(ADD_CLINK_URL, {
  title: title,
  privacy: privacy,
  Authorization: token
});

const addBookmark = (link, title, description, clink, token) => axios.post(ADD_BOOKMARK_URL, {
  link: link,
  title: title,
  description: description,
  clink: clink,
  Authorization: token
});

const fetchClinks = (id) => axios.get(`${FETCH_CLINKS_URL}/${id}`);

const fetchWriteClinks = (token) => axios.get(FETCH_WRITE_CLINKS_URL, {
  headers: {'Authorization': token}
});

const fetchBookmarks = (token, id) => axios.get(`${FETCH_BOOKMARKS_URL}/${id}`, {
  headers: {
    'Authorization': token,
  }
});

const fetchAllUsers = (token) => axios.get(FETCH_ALL_USERS_URL, {
  headers: {
    Authorization: token
  }
});

const fetchUsersWrite = (id, token) => axios.get(`${FETCH_USERS_WRITE_URL}/${id}`, {
  headers: {
    Authorization: token
  }
});

const shareClink = (clink, toShare, token) => axios.post(SHARE_CLINK_URL, {
  clink: clink,
  toShare: toShare,
  Authorization: token
})

const unshareClink = (clink, toRemove, token) => axios.post(UNSHARE_CLINK_URL, {
  clink: clink,
  toRemove: toRemove,
  Authorization: token
})

const fetchUsername = (id) => axios.get(`${FETCH_USERNAME_URL}/${id}`);

export default {
  signUp, login, logout, 
  checkUser, addClink, addBookmark, 
  fetchClinks, fetchWriteClinks, fetchBookmarks,
  fetchAllUsers, fetchUsersWrite,
  shareClink, unshareClink, fetchUsername
}; 	
