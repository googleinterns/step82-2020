import { createSlice } from '@reduxjs/toolkit';
import apis from './apis';

const initialState = {
  isAddingClink: false,

};

const clinkSlice = createSlice({
  name: 'clink',
  initialState,
  reducers: {
    addClinkStart(state){
      state.isAddingClink = true;
    },
    addClinkSucceed(state){
      state.isAddingClink = false;
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
    }     
  },
});

export const {
  addClinkStart, addClinkSucceed, addClinkFailed, addBookmarkStart, addBookmarkSucceed, addBookmarkFailed
} = clinkSlice.actions;

export const addClink = (title, token, callbackSucceed, callbackFailed) => async dispatch => {
  try {
    dispatch(addClinkStart())
    await apis.addClink(title, token) // maybe save value as an variable
    dispatch(addClinkSucceed())
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

export default clinkSlice.reducer;