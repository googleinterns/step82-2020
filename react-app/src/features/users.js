import { createSlice } from '@reduxjs/toolkit';
import apis from './apis';

const initialState = {
  isFetchingUser: false,
  isCurrentUserFetched: false,
  isLoggingIn: false,
  isSigningUp: false,
  isFetchingNoWriteUsers: false,
  isFetchingWriteUsers: false,
  noWriteUsers: [],
  writeUsers: []
};

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    getCurrentUserStart(state) {
      state.isFetchingUser = true;
    },
    getCurrentUserSucceeded(state, action) {
      state.isFetchingUser = false;
      state.isCurrentUserFetched = true;
      state.currentUser = action.payload;
      delete state.authorizationError;
    },
    getCurrentUserFailed(state, action) {
      state.isFetchingUser = false;
      state.isCurrentUserFetched = false;
      state.authorizationError = action.payload;
      delete state.currentUser
    },
    signUpStart(state, _action) {
      state.isSigningUp = true;
      delete state.signUpError;
    },
    signUpSucceeded(state) {
      state.isSigningUp = false;
    },
    signUpFailed(state, action) {
      state.isSigningUp = false;
      state.signUpError = action.payload;
    },
    loginStart(state, _action) {
      state.isLoggingIn = true;
      delete state.loginError;
      delete state.authorizationError;
    },
    loginSucceeded(state, action) {
      localStorage.setItem('currentToken', action.payload);
      state.isLoggingIn = false;
    },
    loginFailed(state, action) {
      state.isLoggingIn = false;
      state.loginError = action.payload;
    },
    logout(state) {
      state.isCurrentUserFetched = false;
      localStorage.removeItem('currentToken');
      delete state.currentUser;
    },
    fetchNoWriteUsersStart(state){
      state.isFetchingNoWriteUsers = true;
    },
    fetchNoWriteUsersSucceed(state, action){
      state.isFetchingNoWriteUsers = false;
      state.noWriteUsers = action.payload;
      delete state.FetchNoWriteUsersError;
    },
    fetchNoWriteUsersFailed(state, action){
      state.isFetchingNoWriteUsers = false;
      state.FetchNoWriteUsersError = action.payload;
    },
    fetchWriteUsersStart(state){
      state.isFetchingWriteUsers = true;
    },
    fetchWriteUsersSucceed(state, action){
      state.isFetchingWriteUsers = false;
      state.writeUsers = action.payload;
      delete state.FetchWriteUsersError;
    },
    fetchWriteUsersFailed(state, action){
      state.isFetchingWriteUsers = false;
      state.FetchWriteUsersError = action.payload;
    },
  },
});

export const {
  getCurrentUserStart, getCurrentUserSucceeded, getCurrentUserFailed,
  signUpStart, signUpSucceeded, signUpFailed,
  loginStart, loginSucceeded, loginFailed,
  logout, fetchNoWriteUsersStart, fetchNoWriteUsersSucceed, fetchNoWriteUsersFailed,
  fetchWriteUsersStart, fetchWriteUsersSucceed, fetchWriteUsersFailed
} = usersSlice.actions;

export const login = (username, password, remember, callbackSucceed, callbackFailed) => async dispatch => {
  try {
    dispatch(loginStart());
    const response = await apis.login(username, password, remember);
    dispatch(loginSucceeded(response.data.Authorization));
    callbackSucceed();
  } catch (err) {
    dispatch(loginFailed(err.response.data.message));
    callbackFailed(err.response.data.message);
  }
}

export const signUp = (email, username, password, callbackSucceed, callbackFailed) => async dispatch => {
  try {
    dispatch(signUpStart());
    await apis.signUp(email, username, password);
    dispatch(signUpSucceeded());
    callbackSucceed();
  } catch (err) {
    dispatch(signUpFailed(err.response.data.message));
    callbackFailed(err.response.data.message);
  }
}

export const logOut = (user) => async dispatch => {
  try {
    dispatch(logout());
    const response = await apis.logout(user);
;  } catch (err) {

;  }
}

export const checkUser = () => async dispatch => {
  try {
    dispatch(getCurrentUserStart());
    const response = await apis.checkUser(localStorage.getItem('currentToken'));
;    dispatch(getCurrentUserSucceeded(response.data.message));
  } catch (err) {
;    dispatch(getCurrentUserFailed(err.response.data.message));
  }
}

export const fetchUsersNoWrite = (clinkId, token) => async dispatch => {
  try {
    dispatch(fetchNoWriteUsersStart());
    const response = await apis.fetchUsersNoWrite(clinkId, token);
    dispatch(fetchNoWriteUsersSucceed(response.data));
  } catch (err) {
    dispatch(fetchNoWriteUsersFailed(err.response.data.message));
  }
}

export const fetchUsersWrite = (clinkId, token) => async dispatch => {
  try {
    dispatch(fetchWriteUsersStart());
    const response = await apis.fetchUsersWrite(clinkId, token);
    dispatch(fetchWriteUsersSucceed(response.data));
  } catch (err) {
    dispatch(fetchWriteUsersFailed(err.response.data.message));
  }
}

export default usersSlice.reducer;
