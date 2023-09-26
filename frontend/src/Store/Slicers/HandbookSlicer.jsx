import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const MachineListData = createAsyncThunk(
    "machinelist/MachineListData",
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
                url = "http://127.0.0.1:8000/api/v1/modelOfMachine/" + id;
            } else {
                url = "http://127.0.0.1:8000/api/v1/modelOfMachine/";
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

export const TransmissionData = createAsyncThunk(
    "transmission/TransmissionData",
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
                url = "http://127.0.0.1:8000/api/v1/modelOfTransmission/" + id;
            } else {
                url = "http://127.0.0.1:8000/api/v1/modelOfTransmission/";
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

export const MainAxleData = createAsyncThunk(
    "mainaxle/MainAxleData",
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
                url = "http://127.0.0.1:8000/api/v1/modelOfMainAxle/" + id;
            } else {
                url = "http://127.0.0.1:8000/api/v1/modelOfMainAxle/";
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

export const SteeringAxleData = createAsyncThunk(
    "steeringaxle/SteeringAxleData",
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
                url = "http://127.0.0.1:8000/api/v1/modelOfSteeringAxle/" + id;
            } else {
                url = "http://127.0.0.1:8000/api/v1/modelOfSteeringAxle/";
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

export const TypeOfMaintenanceData = createAsyncThunk(
    "typeofmaintenance/TypeOfMaintenanceData",
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
                url = "http://127.0.0.1:8000/api/v1/typeOfMaintenance/" + id;
            }
            else {
                url = "http://127.0.0.1:8000/api/v1/typeOfMaintenance/";
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

export const TypeOfFailureData = createAsyncThunk(
    "typeoffailure/TypeOfFailureData",
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
                url = 'http://127.0.0.1:8000/api/v1/typeOfFailure/' + id;
            }
            else
            {
                url = 'http://127.0.0.1:8000/api/v1/typeOfFailure/'
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

export const MethodOfRecoveryData = createAsyncThunk(
    "methodofrecovery/MethodOfRecoveryData",
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
                url = "http://127.0.0.1:8000/api/v1/methodOfRecovery/" + id;
            }
            else
            {
                url = "http://127.0.0.1:8000/api/v1/methodOfRecovery/";
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

export const UsersData = createAsyncThunk(
    "users/UsersData",
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
                url = "http://127.0.0.1:8000/api/v1/users/" + id + "/";
            }
            else {
                url  ="http://127.0.0.1:8000/api/v1/users/";
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
    machinelist: null,
    engine: null,
    transmission: null,
    mainaxle: null,
    steeringaxle: null,
    typeofmaintenance: null,
    typeoffailure: null,
    methodofrecovery: null,
    users: null,
    loading: false,
    error: null,
    success: false,
    status: null,
};

const HandbookSlicer = createSlice({
    name: "handbook",
    initialState,
    reducers: {
        handbookClear: () => {
            return initialState;
        }
    },
    extraReducers: (builder) => {
        builder.addCase(MachineListData.fulfilled, (state, action) => {
            state.machinelist = action.payload;
            state.status = "OK";
            state.loading = false;
            state.success = true;
        });

        builder.addCase(MachineListData.pending, (state) => {
            state.loading = true;
            state.error = null;
        });

        builder.addCase(MachineListData.rejected, (state, action) => {
            state.error = action.payload;
            state.loading = false;
            state.status = "BAD";
        });
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

        builder.addCase(TransmissionData.fulfilled, (state, action) => {
            state.transmission = action.payload;
            state.status = "OK";
            state.loading = false;
            state.success = true;
        });

        builder.addCase(TransmissionData.pending, (state) => {
            state.loading = true;
            state.error = null;
        });

        builder.addCase(TransmissionData.rejected, (state, action) => {
            state.error = action.payload;
            state.loading = false;
            state.status = "BAD";
        });

        builder.addCase(MainAxleData.fulfilled, (state, action) => {
            state.mainaxle = action.payload;
            state.status = "OK";
            state.loading = false;
            state.success = true;
        });

        builder.addCase(MainAxleData.pending, (state) => {
            state.loading = true;
            state.error = null;
        });

        builder.addCase(MainAxleData.rejected, (state, action) => {
            state.error = action.payload;
            state.loading = false;
            state.status = "BAD";
        });

        builder.addCase(SteeringAxleData.fulfilled, (state, action) => {
            state.steeringaxle = action.payload;
            state.status = "OK";
            state.loading = false;
            state.success = true;
        });

        builder.addCase(SteeringAxleData.pending, (state) => {
            state.loading = true;
            state.error = null;
        });

        builder.addCase(SteeringAxleData.rejected, (state, action) => {
            state.error = action.payload;
            state.loading = false;
            state.status = "BAD";
        });

        builder.addCase(TypeOfMaintenanceData.fulfilled, (state, action) => {
            state.typeofmaintenance = action.payload;
            state.status = "OK";
            state.loading = false;
            state.success = true;
        });

        builder.addCase(TypeOfMaintenanceData.pending, (state) => {
            state.loading = true;
            state.error = null;
        });

        builder.addCase(TypeOfMaintenanceData.rejected, (state, action) => {
            state.error = action.payload;
            state.loading = false;
            state.status = "BAD";
        });

        builder.addCase(TypeOfFailureData.fulfilled, (state, action) => {
            state.typeoffailure = action.payload;
            state.status = "OK";
            state.loading = false;
            state.success = true;
        });

        builder.addCase(TypeOfFailureData.pending, (state) => {
            state.loading = true;
            state.error = null;
        });

        builder.addCase(TypeOfFailureData.rejected, (state, action) => {
            state.error = action.payload;
            state.loading = false;
            state.status = "BAD";
        });

        builder.addCase(MethodOfRecoveryData.fulfilled, (state, action) => {
            state.methodofrecovery = action.payload;
            state.status = "OK";
            state.loading = false;
            state.success = true;
        });

        builder.addCase(MethodOfRecoveryData.pending, (state) => {
            state.loading = true;
            state.error = null;
        });

        builder.addCase(MethodOfRecoveryData.rejected, (state, action) => {
            state.error = action.payload;
            state.loading = false;
            state.status = "BAD";
        });

        builder.addCase(UsersData.fulfilled, (state, action) => {
            state.users = action.payload;
            state.status = "OK";
            state.loading = false;
            state.success = true;
        });

        builder.addCase(UsersData.pending, (state) => {
            state.loading = true;
            state.error = null;
        });

        builder.addCase(UsersData.rejected, (state, action) => {
            state.error = action.payload;
            state.loading = false;
            state.status = "BAD";
        });
    },
});
export const { handbookClear } = HandbookSlicer.actions;
export default HandbookSlicer.reducer;
