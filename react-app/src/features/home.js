import { createSlice } from '@reduxjs/toolkit';

const loginButton = "login";
const signUpButton = "sign-up";

const initialState = {
  isButtonClicked: false,
};

const homeSlice = createSlice({
  name: 'home',
  initialState,
  reducers: {
    buttonClicked(state) {
      state.isButtonClicked = true;
    },
    setButtonType(state, action) {
      if (action.payload === loginButton || action.payload === signUpButton){
        state.buttonType = action.payload;
      } 
      state.buttonClicked = false;
    },
    resetHomeState(state) {
      state.isButtonClicked = false;
      delete state.buttonType
    },
  },
});

export const {
  buttonClicked, setButtonType, resetHomeState,
} = homeSlice.actions;

export default homeSlice.reducer;