import { createSlice } from '@reduxjs/toolkit';
import apis from './apis';

const initialState = {

};

const clinkSlice = createSlice({
  name: 'clink',
  initialState,
  reducers: {
    
  },
});

export const {

} = clinkSlice.actions;

export const addClink = (title) => async dispatch => {
  try {
    const response = await apis.addClink(title)
  } catch (err) {

  }
}

export default clinkSlice.reducer;