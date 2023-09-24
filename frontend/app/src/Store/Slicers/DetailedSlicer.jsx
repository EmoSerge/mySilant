import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from 'axios';

export const DetailedData = createAsyncThunk(
    "detailed/DetailedData",
    async (id, { rejectWithValue }) => {
        try {
            const accessToken = localStorage.getItem('accessToken');
            const header = {
                headers: {
                    "Content-type": "application/json",
                    "Accept": "*/*",
                    "Authorization": "Bearer " + accessToken
                },
            };

            const {data} = await axios.get(
                'http://127.0.0.1:8000/api/v1/detailed/' + id,
                header
            );
         
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
};

const DetailedSlicer = createSlice({
    name: "detailed",
    initialState,
    reducers: {
        detailedClear: () => {
            return initialState;
        }
    },
    extraReducers: (builder) => {
        builder.addCase(DetailedData.fulfilled, (state, action) => {
            state.data = action.payload;
            state.status = 'OK';
            state.loading = false;
            state.success = true;
        });

        builder.addCase(DetailedData.pending, (state) => {
            state.loading = true;
            state.error = null;
        });

        builder.addCase(DetailedData.rejected, (state, action) => {
            state.error = action.payload;
            state.loading = false;
            state.status = "BAD";
        });
    },
});

export const { detailedClear } = DetailedSlicer.actions;
export default DetailedSlicer.reducer;