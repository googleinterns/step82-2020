import axios from 'axios';

const BASE_URL = 'http://localhost:3000/apis';
const LOGIN_URL = `${BASE_URL}/login`;
const SIGNUP_URL = `${BASE_URL}/create-user`;

const signup = (values) => axios.post(SIGNUP_URL, {
  email: values.email,
  username: values.username,
  password: values.password
});

const login = (values) => axios.post(LOGIN_URL, {
  username: values.username,
  password: values.password
});

export default {
  login, signup
}