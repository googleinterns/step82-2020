import axios from 'axios';

const BASE_URL = 'http://localhost:3000/apis';
const LOGIN_URL = `${BASE_URL}/login`;
const ADD_COLLECTION_URL = `${BASE_URL}/add-collection`;

const login = (username, password) =>
  axios.post(LOGIN_URL, {username, password});

const addCollection = (name, description) => axios.post(ADD_COLLECTION_URL, {
  name: name,
  description: description
});

export default {
  login,
}