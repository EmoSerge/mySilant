import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";


export const RecoveryMethodData = createAsyncThunk(
    "recoverymethod/RecoveryMethodData",
    async (id, { rejectWithValue }) => {
        try {
            const accessToken = localStorage.getItem("accessToken");
            const header = {
                headers: {
                    "Content-type": "application/json",
                    Accept: "*/*",
                    Authorization: "Bearer " + accessToken,
                },
            };
            let url = '';

            if (id) {
                url = 'http://127.0.0.1:8000/api/v1/recoveryMethod/' + id;
            }
            else
            {
                url = 'http://127.0.0.1:8000/api/v1/recoveryMethod/'
            }

            const { data } = await axios.get(
                url,
                header
            );
            return data;
        } catch (error) {
            if (error.response && error.response.data.message) {
                return rejectWithValue(error.response.data.message);
            } else {
                return rejectWithValue(error.message);
            }
        }
    }
);

const initialState = {
    recoverymethod: null,
    loading: false,
    error: null,
    success: false,
    status: null,
};

const RecoveryMethodSlicer = createSlice({
    name: "FailureType",
    initialState,
    reducers: {
        recoverymethodClear: () => {
            return initialState;
        }
    },
    extraReducers: (builder) => {
        builder.addCase(RecoveryMethodData.fulfilled, (state, action) => {
            state.recoverymethod = action.payload;
            state.status = "OK";
            state.loading = false;
            state.success = true;
        });

        builder.addCase(RecoveryMethodData.pending, (state) => {
            state.loading = true;
            state.error = null;
        });

        builder.addCase(RecoveryMethodData.rejected, (state, action) => {
            state.error = action.payload;
            state.loading = false;
            state.status = "BAD";
        });
    },
});
export const { recoverymethodClear } = RecoveryMethodSlicer.actions;
export default RecoveryMethodSlicer.reducer;