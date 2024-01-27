import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
  userRegister: {},
  isLoading: false,
  created: '',
  accessToken:''
};

export const registerUser = createAsyncThunk('student/user/registerUser', async (data, thunkAPI) => {
  try {
    const response = await axios.post(' http://localhost:3100/api/users/signup', data);
    console.log(response.data);
    // console.log('respponse..', state.created);

    return response.data;
  } catch (e) {
    return thunkAPI.rejectWithValue(e);
  }
});
export const registerLogin = createAsyncThunk('student/user/login', async (data, thunkAPI) => {
  try {
    const response = await axios.post(' http://localhost:3100/api/users/login', data);
    console.log(response.data);
    // console.log('respponse..', state.created);

    return response.data;
  } catch (e) {
    return thunkAPI.rejectWithValue(e);
  }
});

// export const getuSerDetails = createAsyncThunk('student/user/getUser', async (data, thunkAPI) => {
//   try {
//     const response = await axios.post(' http://localhost:3100/api/users/signup', data);
//     console.log(response.data);
//     console.warn('loading', state.isLoading);
//     return response.data;
//   } catch (e) {
//     return thunkAPI.rejectWithValue(e.response.data.message);
//   }
// });

// login/otp/verification
const usersSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUsersData: (state) => {
      state.userRegister = { name: 'ravi' };
    }
  },

  extraReducers: (builder) => {
    builder
      // register state
      .addCase(registerUser.pending, (state) => {
        state.isLoading = true;
        console.warn('pending>>', state.created);
      })

      .addCase(registerUser.fulfilled, (state, { payload }) => {
        state.userRegister = payload.data;
        state.userRegister = payload.success;
        state.created = payload.status;
        localStorage.setItem('userCreated', state.created);
        console.warn('fulfilled>>', state.created);
        console.warn('fulfilledPayload>>', payload.status);
      })
      .addCase(registerUser.rejected, (state, { payload }) => {
        state.isLoading = false;
        state.isLoading = false;
        console.log(payload);
        console.warn('rejected>>', state.created);
      })

      .addCase(registerLogin.pending, (state) => {
        state.isLoading = true;
        console.warn('pendingLogin>>', state.created);
      })

      .addCase(registerLogin.fulfilled, (state, { payload }) => {
        state.userRegister = payload.data;
        state.userRegister = payload.success;
        state.created = 'True';
        localStorage.setItem('accessToken', state.accessToken);
        state.accessToken = payload.accessToken;
        console.warn('fulfilledLoginToken>>',  state.accessToken );
      })
      .addCase(registerLogin.rejected, (state, { payload }) => {
        state.isLoading = false;
        state.isLoading = false;
        console.log(payload);
        console.warn('rejectedLogin>>', state.created);
      });
  }
});

export const { setUsersData } = usersSlice.actions;
export default usersSlice.reducer;
