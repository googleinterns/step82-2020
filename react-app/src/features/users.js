import { createSlice } from '@reduxjs/toolkit';
import apis from './apis';

const initialState = {
  isFetchingUser: false,
  isCurrentUserFetched: false,
  isLoggingIn: false,
  isSigningUp: false,
  isFetchingUsers: false,
  users: []
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
    fetchUsersStart(state) {
      state.isFetchingUsers = true;
    },
    fetchUsersSucceed(state, action) {
      state.isFetchingUsers = false;
      state.users = action.payload;
      delete state.FetchUsersError;
    },
    fetchUsersFailed(state, action) {
      state.isFetchingUsers = false;
      state.FetchUsersError = action.payload;
    },
  },
});

export const {
  getCurrentUserStart, getCurrentUserSucceeded, getCurrentUserFailed,
  signUpStart, signUpSucceeded, signUpFailed,
  loginStart, loginSucceeded, loginFailed,
  logout, fetchUsersStart, fetchUsersSucceed, fetchUsersFailed
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
    await apis.logout(user);
  } catch (err) {

  }
}

export const checkUser = () => async dispatch => {
  try {
    dispatch(getCurrentUserStart());
    const response = await apis.checkUser(localStorage.getItem('currentToken'));
    dispatch(getCurrentUserSucceeded(response.data.message));
  } catch (err) {
    dispatch(getCurrentUserFailed(err.response.data.message));
  }
}

export const fetchUsers = (token) => async dispatch => {
  try {
    dispatch(fetchUsersStart());
    const response = await apis.fetchUsers(token);
    dispatch(fetchUsersSucceed(response.data));
  } catch (err) {
    dispatch(fetchUsersFailed(err.response.data.message));
  }
}

export default usersSlice.reducer;
