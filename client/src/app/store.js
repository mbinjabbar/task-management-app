import { configureStore } from "@reduxjs/toolkit";
import authReducer from './authSlice.js';
import themeReducer from './themeSlice.js';
import taskReducer from './taskSlice.js'

export const store = configureStore({
    reducer: {
        auth: authReducer,
        theme: themeReducer,
        tasks: taskReducer,
    }
});