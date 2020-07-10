import axios from 'axios';

const BASE_URL = 'http://localhost:5000/apis';
const LOGIN_URL = `${BASE_URL}/login`;
const ADD_CLINK_URL = `${BASE_URL}/add-clink`;
const ADD_BOOKMARK_URL = `${BASE_URL}/add-bookmark`;

const login = (username, password) =>
  axios.post(LOGIN_URL, {username, password});

const addClink = (title) => axios.post(ADD_CLINK_URL, {
  title: title
});

const addBookmark = (link, title, description, clink) => axios.post(ADD_BOOKMARK_URL, {
  link: link,
  title: title,
  description: description,
  clink: clink
});

export default {
  login, addClink, addBookmark
}