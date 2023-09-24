import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from 'axios';

export const AddTOData = createAsyncThunk(
    "addto/AddTOData",
    async (body, { rejectWithValue }) => {
        
        try {
            
            const header = {
                headers: {
                    "Content-type": "application/json",
                    "Accept": "*/*",
                    "Authorization": "Bearer " + localStorage.getItem('accessToken')
                },
            };

            const {data} = await axios.post(
                'http://127.0.0.1:8000/api/v1/to/',
                body,
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

export const TOData = createAsyncThunk(
    "to/TOData",
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
                'http://127.0.0.1:8000/api/v1/to/',
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
    addto: null,
    data: null,
    loading: false,
    error: null,
    success: false,
    status: null,
};

const TOSlicer = createSlice({
    name: "to",
    initialState,
    reducers: {
        cleanStateAfterCreated: (state) => {
            state.addto = null
        },
        maintenanceClear: () => {
            return initialState;
        }
    },

    extraReducers: (builder) => {
        builder.addCase(AddTOData.fulfilled, (state, action) => {
            state.addto = action.payload;
            state.status = 'OK';
            state.loading = false;
            state.success = true;
        });

        builder.addCase(AddTOData.pending, (state) => {
            state.loading = true;
            state.error = null;
        });

        builder.addCase(AddTOData.rejected, (state, action) => {
            state.error = action.payload;
            state.loading = false;
            state.status = "BAD";
        });

        builder.addCase(TOData.fulfilled, (state, action) => {
            state.data = action.payload;
            state.status = 'OK';
            state.loading = false;
            state.success = true;
        });

        builder.addCase(TOData.pending, (state) => {
            state.loading = true;
            state.error = null;
        });

        builder.addCase(TOData.rejected, (state, action) => {
            state.error = action.payload;
            state.loading = false;
            state.status = "BAD";
        });
    },
});
export const { cleanStateAfterCreated, toClear } = TOSlicer.actions
export default TOSlicer.reducer;