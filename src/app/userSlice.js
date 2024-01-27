// userSlice.js
import { createSlice } from '@reduxjs/toolkit';

const userSlice = createSlice({
  name: 'user',
  initialState: { username: '', email: '' },
  reducers: {
    setUserName: (state, action) => {
      state.username = action.payload;
    },
    setEmail: (state, action) => {
      state.email = action.payload;
    }
  }
});

export const { setUserName, setEmail } = userSlice.actions;
export default userSlice.reducer;
