import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const AddComplaintsData = createAsyncThunk(
    "addcomplaints/AddComplaintsData",
    async (body, { rejectWithValue }) => {
        console.log(body)
        try {
            const header = {
                headers: {
                    "Content-type": "application/json",
                    Accept: "*/*",
                    Authorization:
                        "Bearer " + localStorage.getItem("accessToken"),
                },
            };

            const { data } = await axios.post(
                "http://127.0.0.1:8000/api/v1/complaints/",
                body,
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

export const ComplaintsData = createAsyncThunk(
    "complaints/ComplaintsData",
    async (accessToken, { rejectWithValue }) => {
        try {
            const header = {
                headers: {
                    "Content-type": "application/json",
                    Accept: "*/*",
                    Authorization: "Bearer " + accessToken,
                },
            };

            const { data } = await axios.get(
                "http://127.0.0.1:8000/api/v1/complaints/",
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
    loading: false,
    error: null,
    success: false,
    status: null,
    data: null,
    addcomplaints: null,
};

const ComplaintsSlicer = createSlice({
    name: "complaints",
    initialState,
    reducers: {
        cleanStateAfterCreated: (state) => {
            state.addcomplaints = null;
        },
        complaintsClear: () => {
            return initialState;
        },
    },

    extraReducers: (builder) => {
        builder.addCase(AddComplaintsData.fulfilled, (state, action) => {
            state.addcomplaints = action.payload;
            state.status = "OK";
            state.loading = false;
            state.success = true;
        });

        builder.addCase(AddComplaintsData.pending, (state) => {
            state.loading = true;
            state.error = null;
        });

        builder.addCase(AddComplaintsData.rejected, (state, action) => {
            state.error = action.payload;
            state.loading = false;
            state.status = "BAD";
        });

        builder.addCase(ComplaintsData.fulfilled, (state, action) => {
            state.data = action.payload;
            state.status = "OK";
            state.loading = false;
            state.success = true;
        });

        builder.addCase(ComplaintsData.pending, (state) => {
            state.loading = true;
            state.error = null;
        });

        builder.addCase(ComplaintsData.rejected, (state, action) => {
            state.error = action.payload;
            state.loading = false;
            state.status = "BAD";
        });
    },
});
export const { cleanStateAfterCreated, complaintsClear } = ComplaintsSlicer.actions
export default ComplaintsSlicer.reducer;
