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
    }   
  },
});

export const {
  addingClinkStart, addingClinkSucceed, addingClinkFailed
} = clinkSlice.actions;

export const addClink = (title) => async dispatch => {
  try {
    dispatch(addingClinkStart())
    await apis.addClink(title) // maybe save value as an variable
    dispatch(addingClinkSucceed())
  } catch (err) {
    console.log(err.response)
    dispatch(addingClinkFailed(err.response))
  }
}

export default clinkSlice.reducer;