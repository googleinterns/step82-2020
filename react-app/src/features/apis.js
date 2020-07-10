import axios from 'axios';

const BASE_URL = 'http://localhost:5000/apis';
const LOGIN_URL = `${BASE_URL}/login`;
const ADD_CLINK_URL = `${BASE_URL}/add-clink`;

const login = (username, password) =>
  axios.post(LOGIN_URL, {username, password});

const addClink = (title) => axios.post(ADD_CLINK_URL, {
  title: title
});

export default {
  login, addClink
}