import { createSlice } from '@reduxjs/toolkit';

export const userSlice = createSlice({
  name: 'user',
  initialState: { userInfo: {} },
  reducers: {
    setUserInfo: (state, action) => {
      localStorage.setItem('userInfo', JSON.stringify(action.payload));
      return { ...state, userInfo: action.payload };
    },
    removeUserInfo: (state) => {
      localStorage.removeItem('userInfo');
      return { ...state, userInfo: {} };
    },
  },
});

export const { setUserInfo, removeUserInfo } = userSlice.actions;

export default userSlice.reducer;
