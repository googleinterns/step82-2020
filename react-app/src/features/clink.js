import { createSlice } from '@reduxjs/toolkit';
import apis from './apis';

const initialState = {

};

const usersSlice = createSlice({
  name: 'clink',
  initialState,
  reducers: {
    
  },
});

export const {

} = usersSlice.actions;

export const addClink = (title) => async dispatch => {
  try {
    const response = await apis.addClink(title)
  } catch (err) {

  }
}

export default usersSlice.reducer;