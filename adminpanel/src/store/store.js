import { configureStore } from '@reduxjs/toolkit';
import reportsReducer from '../store/slices/reportSlice';

export const store = configureStore({
    reducer: {
        reports: reportsReducer
    }
});
