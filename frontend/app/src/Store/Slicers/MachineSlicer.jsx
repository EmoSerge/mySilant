import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const AddMachineData = createAsyncThunk(
    "addmachine/AddMachineData",
    async (body, { rejectWithValue }) => {
        console.log(body)
        try {
            const header = {
                headers: {
                    "Content-type": "application/json",
                    Accept: "*/*",
                    Authorization: "Bearer " + localStorage.getItem('accessToken'),
                },
            };
            const { data } = await axios.post(
                "http://127.0.0.1:8000/api/v1/machine/",
                {body},
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

export const MachineData = createAsyncThunk(
    "machine/MachineData",
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
                "http://127.0.0.1:8000/api/v1/machine/",
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

export const oneMachineData = createAsyncThunk(
    "oneMachine/oneMachineData",
    async (factoryNumberOfMachine, { rejectWithValue }) => {
        try {
            const header = {
                headers: {
                    "Content-type": "application/json",
                    Accept: "*/*",
                },
            };
            const { data } = await axios.get(
                "http://127.0.0.1:8000/api/v1/machine/" +
                    factoryNumberOfMachine,
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
    addmachine: null,
    oneData: null
};

const MachineSlicer = createSlice({
    name: "machine",
    initialState,
    reducers: {
        cleanStateAfterCreated: (state) => {
            state.addmachine = null
        },
        machineClear: () => {
            return initialState;
        }
    },
    extraReducers: (builder) => {
        builder.addCase(AddMachineData.fulfilled, (state, action) => {
            state.addmachine = action.payload;
            state.status = "OK";
            state.loading = false;
            state.success = true;
        });

        builder.addCase(AddMachineData.pending, (state) => {
            state.loading = true;
            state.error = null;
        });

        builder.addCase(AddMachineData.rejected, (state, action) => {
            state.error = action.payload;
            state.data = null;
            state.loading = false;
            state.status = "BAD";
        });
        builder.addCase(MachineData.fulfilled, (state, action) => {
            state.data = action.payload;
            state.status = "OK";
            state.loading = false;
            state.success = true;
        });

        builder.addCase(MachineData.pending, (state) => {
            state.loading = true;
            state.error = null;
        });

        builder.addCase(MachineData.rejected, (state, action) => {
            state.error = action.payload;
            state.data = null;
            state.loading = false;
            state.status = "BAD";
        });

        builder.addCase(oneMachineData.fulfilled, (state, action) => {
            state.oneData = action.payload;
            state.status = "OK";
            state.loading = false;
            state.success = true;
        });

        builder.addCase(oneMachineData.pending, (state) => {
            state.loading = true;
            state.error = null;
        });

        builder.addCase(oneMachineData.rejected, (state, action) => {
            state.error = action.payload;
            state.oneData = null;
            state.loading = false;
            state.status = "BAD";
        });
    },
});
export const { cleanStateAfterCreated, machineClear } = MachineSlicer.actions;
export default MachineSlicer.reducer;
