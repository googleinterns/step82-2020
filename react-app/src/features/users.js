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
    getCurrentUser(state) {
      const currentUser = localStorage.getItem('currentUser');
      state.isCurrentUserFetched = true;
      // try {
      state.currentUser = currentUser && JSON.parse(currentUser);
      // } catch (e) {
      //   console.error(e);
      // }
    },
    signUpStart(state, _action) {
      state.isSigningUp = true;
      delete state.signUpError;
    },
    signUpSucceeded(state) {
      state.isSigningUp = false;
    },
    signUpFailed(state) {
      state.isSigningUp = false;
      state.signUpError = 'Username or Email is Already Taken';
    },
    loginStart(state, _action) {
      state.isLoggingIn = true;
      delete state.loginError;
    },
    loginSucceeded(state, action) {
      localStorage.setItem('currentUser', JSON.stringify(action.payload));

      state.isLoggingIn = false;
      state.currentUser = action.payload;
    },
    loginFailed(state) {
      state.isLoggingIn = false;
      state.loginError = 'Login Failed';
    },
    logout(state) {
      localStorage.removeItem('currentUser');
      delete state.currentUser;
    },
  },
});

export const {
  getCurrentUser, signUpStart, signUpSucceeded, signUpFailed, loginStart, loginSucceeded, loginFailed, logout,
} = usersSlice.actions;

export const login = (username, password) => async dispatch => {
  try {
    dispatch(loginStart())
    const response = await apis.login(username, password)
    dispatch(loginSucceeded(response.data))
  } catch (err) {
    dispatch(loginFailed(err.toString()))
  }
}

export const signUp = (email, username, password) => async dispatch => {
  try {
    dispatch(signUpStart())
    apis.signUp(email, username, password)
    dispatch(signUpSucceeded())
  } catch (err) {
    dispatch(signUpFailed(err.toString()))
  }
}

export default usersSlice.reducer;