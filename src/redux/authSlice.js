import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import authService from '../services/auth.service';

const authUser = authService.getStoredAuthUser();

export const login = createAsyncThunk('auth/login', async  (user, thunkAPI) => {
    try {
      return await authService.login(user)
    } catch (error) {
      const message =
        (error.response && error.response.data && error.response.data.message) ||
        error.message ||
        error.toString()
      return thunkAPI.rejectWithValue(message)
    }
  })

export const logout= createAsyncThunk('auth/logout', async  () =>{
    await authService.logout();
})

export const authSlice = createSlice({
    name: 'auth',
    initialState:  {
        authUser: authUser? authUser : null,
        isLoading: false,
        error: '',
    },
    extraReducers: (builder) => {
        builder
          .addCase(login.pending, (state) => {
            state.isLoading = true;
            state.authUser = null;
          })
          .addCase(login.fulfilled, (state, action) => {
            state.isLoading = false;
            state.authUser = action.payload;
            state.error = "";
          })
          .addCase(login.rejected, (state) => {
            state.isLoading = false;
            state.error = "Something went wrong!"
            state.authUser = null;
          })
          .addCase(logout.fulfilled, (state) => {
            state.authUser = null;
          })
      },
});

export const selectAuthUser = (state) => state.auth.authUser;
export default authSlice.reducer;

