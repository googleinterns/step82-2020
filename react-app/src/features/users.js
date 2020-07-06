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
      try {
        state.currentUser = JSON.parse(currentUser);
      } catch (e) {
        console.error(e);
      }
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
  getCurrentUser, loginStart, loginSucceeded, loginFailed, logout,
} = usersSlice.actions;

export const login = (username, password) => async dispatch => {
  console.log("logging in...")
  try {
    dispatch(loginStart())
    const response = await apis.login(username, password)
    console.log(response)
    dispatch(loginSucceeded(response))
  } catch (err) {
    dispatch(loginFailed(err.toString()))
    console.log(err)
  }
}

export default usersSlice.reducer;