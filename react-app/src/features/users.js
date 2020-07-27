import { createSlice } from '@reduxjs/toolkit';
import apis from './apis';

const initialState = {
  isFetchingUser: false,
  isCurrentUserFetched: false,
  isLoggingIn: false,
  isSigningUp: false,
  isFetchingAllUsers: false,
  isFetchingWriteUsers: false,
  isSharingClink: false,
  allUsers: [],
  writeUsers: [],
  noWriteUsers: []
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
    fetchAllUsersStart(state){
      state.isFetchingAllUsers = true;
    },
    fetchAllUsersSucceed(state, action){
      state.isFetchingAllUsers = false;
      state.AllUsers = action.payload;
      delete state.FetchAllUsersError;
    },
    fetchAllUsersFailed(state, action){
      state.isFetchingAllUsers = false;
      state.FetchAllUsersError = action.payload;
    },
    fetchWriteUsersStart(state){
      state.isFetchingWriteUsers = true;
    },
    fetchWriteUsersSucceed(state, action){
      state.isFetchingWriteUsers = false;
      state.writeUsers = action.payload;
      for (var user of action.payload) {
        state.noWriteUsers = state.noWriteUsers.filter((item) => item.id !== user.id)
      }
      delete state.FetchWriteUsersError;
    },
    fetchWriteUsersFailed(state, action){
      state.isFetchingWriteUsers = false;
      state.FetchWriteUsersError = action.payload;
    },
    shareClinkStart(state) {
      state.isSharingClink = true;
    },
    shareClinkSucceed(state, action) {
      state.isSharingClink = false;
      state.writeUsers = [action.payload, ...state.writeUsers];
      for (var user of action.payload) {
        state.noWriteUsers = state.noWriteUsers.filter((item) => item.id !== user.id);
      }
      delete state.clinkError;
    },
    shareClinkFailed(state, action) {
      state.isSharingClink = false;
      state.clinkError = action.payload;
    },
  },
});

export const {
  getCurrentUserStart, getCurrentUserSucceeded, getCurrentUserFailed,
  signUpStart, signUpSucceeded, signUpFailed,
  loginStart, loginSucceeded, loginFailed,
  logout, fetchAllUsersStart, fetchAllUsersSucceed, fetchAllUsersFailed,
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

export const fetchAllUsers = (token) => async dispatch => {
  try {
    dispatch(fetchAllUsersStart());
    const response = await apis.fetchUsersAll(token);
    dispatch(fetchAllUsersSucceed(response.data));
  } catch (err) {
    dispatch(fetchAllUsersFailed(err.response.data.message));
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
