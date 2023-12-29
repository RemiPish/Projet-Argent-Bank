import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import authService from '../services/auth.service';

export const fetchUserProfile = createAsyncThunk('auth/profile', async (token, thunkAPI) => {
    try {
        return await authService.profile(token);
    } catch (error) {
        const message =
            (error.response && error.response.data && error.response.data.message) ||
            error.message ||
            error.toString()
        return thunkAPI.rejectWithValue(message)
    }
})

export const updateProfile = createAsyncThunk('auth/updateProfile', async (profile, thunkAPI) => {
    try {
        const response = await authService.updateProfile(profile.token, profile.firstName, profile.lastName);
        return response;
    } catch (error) {
        const message =
            (error.response && error.response.data && error.response.data.message) ||
            error.message ||
            error.toString()
        return thunkAPI.rejectWithValue(message)
    }
});
const getStoredUserDetails = () => {
    const userDetailsLocalStorage = localStorage.getItem("userDetails");
    const userDetailsSessionStorage = sessionStorage.getItem("userDetails");

    if (userDetailsLocalStorage) {
        return JSON.parse(userDetailsLocalStorage);
    }
    else if (userDetailsSessionStorage) {
        return JSON.parse(userDetailsSessionStorage);
    }

    return null;
};

const storedUserDetails = getStoredUserDetails();

export const userSlice = createSlice({
    name: 'user',
    initialState: {
        user: storedUserDetails,
        error: null,
        isLoading: false,
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchUserProfile.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(fetchUserProfile.fulfilled, (state, action) => {
                state.isLoading = false;
                state.user = action.payload;
            })
            .addCase(fetchUserProfile.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload || 'Failed to fetch profile';
            })
            .addCase(updateProfile.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(updateProfile.fulfilled, (state, action) => {
                state.isLoading = false;
                state.user = action.payload.body;
            })
            .addCase(updateProfile.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload || 'Failed to update profile';
            });
    },
});

export const selectUser = (state) => state.user.user;
export default userSlice.reducer;