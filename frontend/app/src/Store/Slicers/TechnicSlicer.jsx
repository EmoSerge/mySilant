import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const TechnicListData = createAsyncThunk(
    "techniclist/TechnicListData",
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
            let url = "";

            if (id) {
                url = "http://127.0.0.1:8000/api/v1/technic/" + id;
            } else {
                url = "http://127.0.0.1:8000/api/v1/technic/";
            }

            const { data } = await axios.get(url, header);

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
    techniclist: null,
    loading: false,
    error: null,
    success: false,
    status: null,
};
const TechnicSlicer = createSlice({
    name: "Technic",
    initialState,
    reducers: {
        technicClear: () => {
            return initialState;
        }
    },
    extraReducers: (builder) => {
        builder.addCase(TechnicListData.fulfilled, (state, action) => {
            state.techniclist = action.payload;
            state.status = "OK";
            state.loading = false;
            state.success = true;
        });

        builder.addCase(TechnicListData.pending, (state) => {
            state.loading = true;
            state.error = null;
        });

        builder.addCase(TechnicListData.rejected, (state, action) => {
            state.error = action.payload;
            state.loading = false;
            state.status = "BAD";
        });
    },
});
export const { technicClear } = TechnicSlicer.actions;
export default TechnicSlicer.reducer;

