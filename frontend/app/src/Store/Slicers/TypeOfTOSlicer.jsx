import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const TypeOfTOData = createAsyncThunk(
    "typeofto/TypeOfTO",
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
                url = "http://127.0.0.1:8000/api/v1/typeOfTO/" + id;
            }
            else {
                url = "http://127.0.0.1:8000/api/v1/typeOfTO/";
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
    typeofto: null,
    loading: false,
    error: null,
    success: false,
    status: null,
};

const TypeOfTOSlicer = createSlice({
    name: "TypeOfTO",
    initialState,
    reducers: {
        typeoftoClear: () => {
            return initialState;
        }
    },
    extraReducers: (builder) => {
        builder.addCase(TypeOfTOData.fulfilled, (state, action) => {
            state.typeofto = action.payload;
            state.status = "OK";
            state.loading = false;
            state.success = true;
        });

        builder.addCase(TypeOfTOData.pending, (state) => {
            state.loading = true;
            state.error = null;
        });

        builder.addCase(TypeOfTOData.rejected, (state, action) => {
            state.error = action.payload;
            state.loading = false;
            state.status = "BAD";
        });
    },
});
export const { typeoftoClear } = TypeOfTOSlicer.actions;
export default TypeOfTOSlicer.reducer;