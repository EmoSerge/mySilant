import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from 'axios';

export const UserData = createAsyncThunk(
    "user/UserData",
    async (accessToken, { rejectWithValue }) => {
        try {
            
            const header = {
                headers: {
                    "Content-type": "application/json",
                    "Accept": "*/*",
                    "Authorization": "Bearer " + accessToken
                },
            };

            const {data} = await axios.get(
                'http://127.0.0.1:8000/api/v1/userInfo/',
                header
            );
            localStorage.setItem("user_firstname", data[0].first_name);
            
            return data;
        }
        catch (error) {
            if (error.response && error.response.data.message) {
                return rejectWithValue(error.response.data.message);
            } else {
                return rejectWithValue(error.message);
            }
        }
    }
);

const initialState = {
    loading: false,
    error: null,
    success: false,
    status: null,
    data: null
    
};

const UserInfoSlicer = createSlice({
    name: "user",
    initialState,
    reducers: {
        userInfoClear: () => {
            return initialState;
        }
    },
    extraReducers: (builder) => {
        builder.addCase(UserData.fulfilled, (state, action) => {
            state.data = action.payload;
            state.status = 'OK';
            state.loading = false;
            state.success = true;
        });

        builder.addCase(UserData.pending, (state) => {
            state.loading = true;
            state.error = null;
        });

        builder.addCase(UserData.rejected, (state, action) => {
            state.error = action.payload;
            state.loading = false;
            state.status = "BAD";
        });
    },
});
export const { userInfoClear } = UserInfoSlicer.actions;
export default UserInfoSlicer.reducer;