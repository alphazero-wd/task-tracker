import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import * as api from '../api/index';
export const signin = createAsyncThunk('user/signin', async (formValue) => {
  try {
    const { data } = await api.signin(formValue);
    return data;
  } catch (error) {
    return error.response.data.message;
  }
});

export const signup = createAsyncThunk('user/signup', async (formValue) => {
  try {
    const { data } = await api.signup(formValue);
    return data;
  } catch (error) {
    return error.response.data.message;
  }
});

const userSlice = createSlice({
  name: 'user',
  initialState: {
    user: JSON.parse(localStorage.getItem('user')),
    error: null,
  },
  reducers: {
    loginUser: (state, action) => {
      state.user = action.payload;
    },

    logoutUser: (state) => {
      localStorage.removeItem('user');
      state.user = null;
    },
    clearError: (state) => {
      state.error = '';
    },
  },
  extraReducers: {
    [signin.fulfilled]: (state, action) => {
      if (action?.payload?.profile) {
        state.user = action.payload;
        state.error = '';
      } else {
        state.error = action?.payload;
      }
    },
    [signup.fulfilled]: (state, action) => {
      if (action?.payload?.profile) {
        state.user = action.payload;
        state.error = '';
      } else {
        state.error = action?.payload;
      }
    },
  },
});
export const { loginUser, logoutUser, clearError } = userSlice.actions;
export default userSlice.reducer;
