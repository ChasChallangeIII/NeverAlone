import { configureStore } from '@reduxjs/toolkit';
import reportsReducer from '../store/slices/reportSlice';
import reportCommentsReducer from '../store/slices/CommentsSlice';
import authReducer from '../store/slices/authSlice';
import usersReducer from '../store/slices/userSlice';

export const store = configureStore({
    reducer: {
        reports: reportsReducer,
        reportComments: reportCommentsReducer,
        auth: authReducer,
        users: usersReducer,
        
    }
});
