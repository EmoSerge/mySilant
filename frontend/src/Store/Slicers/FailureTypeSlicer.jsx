import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";


export const FailureTypeData = createAsyncThunk(
    "failuretype/FailureTypeData",
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
                url = 'http://127.0.0.1:8000/api/v1/failureType/' + id;
            }
            else
            {
                url = 'http://127.0.0.1:8000/api/v1/failureType/'
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
    failuretype: null,
    loading: false,
    error: null,
    success: false,
    status: null,
};

const FailureTypeSlicer = createSlice({
    name: "FailureType",
    initialState,
    reducers: {
        failuretypeClear: () => {
            return initialState;
        }
    },
    extraReducers: (builder) => {
        builder.addCase(FailureTypeData.fulfilled, (state, action) => {
            state.failuretype = action.payload;
            state.status = "OK";
            state.loading = false;
            state.success = true;
        });

        builder.addCase(FailureTypeData.pending, (state) => {
            state.loading = true;
            state.error = null;
        });

        builder.addCase(FailureTypeData.rejected, (state, action) => {
            state.error = action.payload;
            state.loading = false;
            state.status = "BAD";
        });
    },
});
export const { failuretypeClear } = FailureTypeSlicer.actions;
export default FailureTypeSlicer.reducer;