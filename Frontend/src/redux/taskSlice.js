import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_URL = "http://localhost:4000/task";

// Fetch tasks
export const fetchTasks = createAsyncThunk("tasks/fetch", async (id, { rejectWithValue }) => {
    try {
        const res = await axios.get(`${API_URL}/user/${id}`);
        return res.data;
    } catch (err) {
        return rejectWithValue(err.response?.data?.message || "Failed to fetch tasks");
    }
});

// Create a task
export const createTask = createAsyncThunk("create", async (taskData, { rejectWithValue }) => {
    try {
        const res = await axios.post(`${API_URL}/create`, taskData);
        return res.data;
    } catch (err) {
        return rejectWithValue(err.response?.data?.message || "Task creation failed");
    }
});

// Task slice
const taskSlice = createSlice({
    name: "tasks",
    initialState: { tasks: [], loading: false, error: null },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchTasks.pending, (state) => { state.loading = true; })
            .addCase(fetchTasks.fulfilled, (state, action) => {
                state.loading = false;
                state.tasks = action.payload;
            })
            .addCase(fetchTasks.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(createTask.fulfilled, (state, action) => {
                state.tasks.push(action.payload);
            });
    }
});

export default taskSlice.reducer;
