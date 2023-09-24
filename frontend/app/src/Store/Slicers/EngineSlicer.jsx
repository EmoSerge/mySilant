import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const EngineData = createAsyncThunk(
    "engine/EngineData",
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
                url = "http://127.0.0.1:8000/api/v1/modelOfEngine/" + id;
            } else {
                url = "http://127.0.0.1:8000/api/v1/modelOfEngine/";
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
    engine: null,
    loading: false,
    error: null,
    success: false,
    status: null,
};
const EngineSlicer = createSlice({
    name: "Engine",
    initialState,
    reducers: {
        engineClear: () => {
            return initialState;
        }
    },
    extraReducers: (builder) => {
        builder.addCase(EngineData.fulfilled, (state, action) => {
            state.engine = action.payload;
            state.status = "OK";
            state.loading = false;
            state.success = true;
        });

        builder.addCase(EngineData.pending, (state) => {
            state.loading = true;
            state.error = null;
        });

        builder.addCase(EngineData.rejected, (state, action) => {
            state.error = action.payload;
            state.loading = false;
            state.status = "BAD";
        });
    },
});
export const { engineClear } = EngineSlicer.actions;
export default EngineSlicer.reducer;