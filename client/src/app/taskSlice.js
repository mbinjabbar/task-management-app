import { createSlice } from "@reduxjs/toolkit";

const taskSlice = createSlice({
    name: "tasks",
    initialState: {
        tasks: [],
    },
    reducers: {
        setTasks: (state, action) => {
            state.tasks = action.payload;
        },

        addTask: (state, action) => {
            state.tasks.unshift(action.payload);
        },

        deleteTask: (state, action) => {
            state.tasks = state.tasks.filter(
                task => task._id !== action.payload
            );
        },

        updateTask: (state, action) => {
            const index = state.tasks.findIndex(t => t._id === action.payload._id);
            if (index !== -1) {
                state.tasks[index] = action.payload;
            }
        }

    }
})

export const { setTasks, addTask, deleteTask, updateTask } = taskSlice.actions;
export default taskSlice.reducer;