import { createSlice } from '@reduxjs/toolkit';
import apis from './apis';

const initialState = {
  isAddingClink: false,

};

const clinkSlice = createSlice({
  name: 'clink',
  initialState,
  reducers: {
    addingClinkStart(state){
      state.isAddingClink = true;
    },
    addingClinkSucceed(state){
      state.isAddingClink = false;
      delete state.clinkError;
    },
    addingClinkFailed(state, action){
      state.isAddingClink = false;
      state.clinkError = action.payload;
    },
    addingBookmarkStart(state){
      state.isAddingBookmark = true;
    },
    addingBookmarkSucceed(state){
      state.isAddingBookmark = false;
      delete state.clinkError;
    },
    addingBookmarkFailed(state, action){
      state.isAddingBookmark = false;
      state.bookmarkError = action.payload;
    }     
  },
});

export const {
  addingClinkStart, addingClinkSucceed, addingClinkFailed, addingBookmarkStart, addingBookmarkSucceed, addingBookmarkFailed
} = clinkSlice.actions;

export const addClink = (title, callbackSucceed, callbackFailed) => async dispatch => {
  try {
    dispatch(addingClinkStart())
    await apis.addClink(title) // maybe save value as an variable
    dispatch(addingClinkSucceed())
    callbackSucceed()
  } catch (err) {
    console.log(err)
    dispatch(addingClinkFailed(err.response.data.message))
    callbackFailed(err.response.data.message)
  }
}

export const addBookmark = (link, title, description, clink) => async dispatch => {
  try {
    dispatch(addingBookmarkStart())
    const response = await apis.addBookmark(link, title, description, clink)
    console.log(response)
    dispatch(addingBookmarkSucceed())
  } catch (err) {
    console.log(err)
    dispatch(addingBookmarkFailed(err.response.data.message))
  }
}

export default clinkSlice.reducer;