import axios from 'axios';

const BASE_URL = 'http://localhost:5000/apis';
const LOGIN_URL = `${BASE_URL}/login`;
const SIGNUP_URL = `${BASE_URL}/sign-up`;
const LOGOUT_URL = `${BASE_URL}/logout`;

const signup = (email, username, password) => axios.post(SIGNUP_URL, {
  email: email,
  username: username,
  password: password
});

const login = (username, password) => axios.post(LOGIN_URL, {
  username: username,
  password: password
});

const logout = () => axios.post(LOGOUT_URL, {});

export default {
  login, signup, logout
}