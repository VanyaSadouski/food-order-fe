import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isAdmin: false,
  firstName: 'Test',
  lastName: 'Testovich',
  email: 'test@mail.com',
  phone: '+375336960805',
  authenticated: false,
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUserInfo: (state, action) => {
      state = action.payload;
    },
  },
});

export const { setUserInfo } = userSlice.actions;

export default userSlice.reducer;
