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
    }   
  },
});

export const {
  addClinkStart, addClinkSucceed, addClinkFailed
} = clinkSlice.actions;

export const addClink = (title, user_id, callbackSucceed, callbackFailed) => async dispatch => {
  try {
    dispatch(addClinkStart())
    await apis.addClink(title, user_id) // maybe save value as an variable
    dispatch(addClinkSucceed())
    callbackSucceed()
  } catch (err) {
    console.log(err)
    dispatch(addClinkFailed(err.response.data.message))
    callbackFailed(err.response.data.message)
  }
}

export default clinkSlice.reducer;