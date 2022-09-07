import { createSlice } from '@reduxjs/toolkit';

export const orderSlice = createSlice({
  name: 'order',
  initialState: { orderInfo: null },
  reducers: {
    setOrderInfo: (state, action) => {
      localStorage.setItem('orderInfo', JSON.stringify(action.payload));
      return { ...state, orderInfo: action.payload };
    },
    removeOrderInfo: (state) => {
      return { ...state, orderInfo: {} };
    },
  },
});

export const { setOrderInfo, removeOrderInfo } = orderSlice.actions;

export default orderSlice.reducer;
