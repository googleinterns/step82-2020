import { createSlice } from '@reduxjs/toolkit';
import apis from './apis';

const initialState = {
  isAddingClink: false,
  isAddingBookmark: false,
  isFetchingClinks: false,
  clinks: []
};

const clinkSlice = createSlice({
  name: 'clink',
  initialState,
  reducers: {
    addClinkStart(state){
      state.isAddingClink = true;
    },
    addClinkSucceed(state, action){
      state.isAddingClink = false;
      state.clinks = [...state.clinks, action.payload]
      delete state.clinkError;
    },
    addClinkFailed(state, action){
      state.isAddingClink = false;
      state.clinkError = action.payload;
    },
    addBookmarkStart(state){
      state.isAddingBookmark = true;
    },
    addBookmarkSucceed(state){
      state.isAddingBookmark = false;
      delete state.clinkError;
    },
    addBookmarkFailed(state, action){
      state.isAddingBookmark = false;
      state.bookmarkError = action.payload;
    },
    fetchClinksStart(state){
      state.isFetchingClink = true;
    },
    fetchClinksSucceed(state, action){
      state.isFetchingClink = false;
      state.clinks = action.payload
      delete state.clinkError;
    },
    fetchClinksFailed(state, action){
      state.isFetchingClink = false;
      state.clinkError = action.payload;
    },     
  },
});

export const {
  addClinkStart, addClinkSucceed, addClinkFailed, 
  addBookmarkStart, addBookmarkSucceed, addBookmarkFailed,
  fetchClinksStart, fetchClinksSucceed, fetchClinksFailed,
} = clinkSlice.actions;

export const addClink = (title, token, callbackSucceed, callbackFailed) => async dispatch => {
  try {
    dispatch(addClinkStart())
    const response = await apis.addClink(title, token) 
    console.log(response)
    dispatch(addClinkSucceed(response.data))
    callbackSucceed()
  } catch (err) {
    dispatch(addClinkFailed(err.response.data.message))
    callbackFailed(err.response.data.message)
  }
}

export const addBookmark = (link, title, description, clink, callbackSucceed, callbackFailed) => async dispatch => {
  try {
    dispatch(addBookmarkStart())
    const response = await apis.addBookmark(link, title, description, clink)
    dispatch(addBookmarkSucceed())
    callbackSucceed()
  } catch (err) {
    dispatch(addBookmarkFailed(err.response.data.message))
    callbackFailed(err.response.data.message)
  }
}

export const fetchClinks = (token) => async dispatch => {
  try {
    dispatch(fetchClinksStart())
    const response = await apis.fetchClinks(token)
    dispatch(fetchClinksSucceed(response.data))
  } catch (err) {
    dispatch(fetchClinksFailed(err.response.data.message))
  }
}

export default clinkSlice.reducer;