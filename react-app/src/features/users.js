import { createSlice } from '@reduxjs/toolkit';
import apis from './apis';

const initialState = {
  isCurrentUserFetched: false,
  isLoggingIn: false,
  isSigningUp: false,
};

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    loginStart(state, _action) {
      state.isLoggingIn = true;
      delete state.loginError;
    },
    loginSucceeded(state, action) {
      localStorage.setItem('currentToken', JSON.stringify(action.payload));

      state.isLoggingIn = false;
      state.currentUser = action.payload;
    },
    loginFailed(state) {
      state.isLoggingIn = false;
      state.loginError = 'Login Failed';
    },
    getCurrentUserFailed(state) {
      state.isCurrentUserFetched = true;
      state.getCurrUserError = 'Get user failed';
    },
    getCurrentUserSucceeded(state) {
      state.isCurrentUserFetched = true;
    },
    logout(state) {
      localStorage.removeItem('currentUser');
      localStorage.removeItem('currentToken');
      delete state.currentUser;
      delete state.currentToken;
    },
  },
});

export const {
  loginStart, loginSucceeded, loginFailed, logout,
} = usersSlice.actions;

export const login = (username, password) => async dispatch => {
  console.log("logging in...")
  try {
    dispatch(loginStart())
    const response = await apis.login(username, password)
    console.log(response)
    dispatch(loginSucceeded(response.data.Authorization))
  } catch (err) {
    dispatch(loginFailed(err.toString()))
    console.log(err)
  }
}

export const logOut = (user) => async dispatch => {
  console.log("logging out...")
  try {
    dispatch(logout())
    const response = await apis.logout(user)
    console.log(response)
  } catch (err) {
    console.log(err)
  }
}

export const getCurrentUser = (token) => async dispatch => {
  console.log("checking token")
  const currentToken = localStorage.getItem('currentToken')
  try {
    const response = await apis.getCurrentUser(currentToken)
    console.log("token response: " + response)
  } catch (err) {
    console.log(err)
  }
}

export default usersSlice.reducer;