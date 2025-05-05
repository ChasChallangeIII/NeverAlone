import { configureStore } from '@reduxjs/toolkit';
import reportsReducer from '../store/slices/reportSlice';
import reportCommentsReducer from '../store/slices/CommentsSlice';

export const store = configureStore({
    reducer: {
        reports: reportsReducer,
        reportComments: reportCommentsReducer,
    }
});
