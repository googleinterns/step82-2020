import axios from 'axios';

const BASE_URL = 'http://localhost:3000/apis';
const LOGIN_URL = `${BASE_URL}/login`;
const SIGNUP_URL = `${BASE_URL}/create-user`;

const signup = (eMail, userName, passWord) => axios.post(SIGNUP_URL, {
  email: eMail,
  username: userName,
  password: passWord
});

const login = (userName, passWord) => axios.post(LOGIN_URL, {
  username: userName,
  password: passWord
});

export default {
  login, signup
}