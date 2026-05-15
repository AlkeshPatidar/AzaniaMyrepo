import {createSlice} from '@reduxjs/toolkit';

export const userSlice = createSlice({
  name: 'userData',
  initialState: {
    userData: {},
    login: false,
    isFreeAccess: true,
    isFirstTime: true,
    skip: false
  },
  reducers: {
    setUser(state, action) {
      const user = action.payload;
      return {...state, userData: user, login: true};
    },
    removeUser(state, action) {
      return {...state, userData: {}, login: false};
    },
    setIsFirstTime(state, action) {
      return {...state, isFirstTime: action.payload};
    },
    setSkip(state, action) {
      return {...state, skip: action.payload};
    },
  },
});

export const {setUser, removeUser, setIsFirstTime, setSkip} = userSlice.actions;

export default userSlice.reducer;
