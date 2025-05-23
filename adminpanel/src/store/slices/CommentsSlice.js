import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';


const API_BASE = 'https://neveralone.onrender.com/admin/comments';

export const fetchCommentsByReportId = createAsyncThunk(
    'comments/fetchByReportId',
    async (reportId, thunkAPI) => {
        const state = thunkAPI.getState();
        const token = state.auth.token;  
        const res = await fetch(`${API_BASE}/report/${reportId}`, {
        headers: {
            'Authorization': `Bearer ${token}`
        }
        });

        if (!res.ok) throw new Error('Failed to fetch comments');
        const comments = await res.json();

        return { reportId, comments };
    }
);

export const postComment = createAsyncThunk(
    'comments/postComment',
    async (commentData, { dispatch, getState, rejectWithValue }) => {
    try {
        const token = getState().auth.token;
        const { report_id, admin_id, comment } = commentData;

        const res = await fetch('https://neveralone.onrender.com/admin/comments', {  // POST till /admin/comments
            method: 'POST',
            headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
            },
            body: JSON.stringify({
            reportId: report_id,
            adminId: admin_id,
            comment,
            }),
        });

        if (!res.ok) {
            const errorData = await res.json();
            return rejectWithValue(errorData.message || 'Failed to post comment');
        }

        const newComment = await res.json();

        // Uppdatera kommentarslistan efter ny kommentar
        dispatch(fetchCommentsByReportId(report_id));

        return newComment;
        } catch (error) {
        return rejectWithValue(error.message || 'Failed to post comment');
        }
    }
    );


const commentsSlice = createSlice({
    name: 'reportComments',
    initialState: {
    commentsByReport: {},
    status: 'idle',
    error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
        .addCase(fetchCommentsByReportId.pending, (state) => {
            state.status = 'loading';
        })
        .addCase(fetchCommentsByReportId.fulfilled, (state, action) => {
            state.status = 'succeeded';
            state.commentsByReport[action.payload.reportId] = action.payload.comments;
        })
        .addCase(fetchCommentsByReportId.rejected, (state, action) => {
            state.status = 'failed';
            state.error = action.error.message;
        })
        .addCase(postComment.fulfilled, (state, action) => {
            const newComment = action.payload;
            const reportId = newComment.report_id;

            if (!state.commentsByReport[reportId]) {
            state.commentsByReport[reportId] = [];
            }

            state.commentsByReport[reportId].push(newComment);
        });
    },
});

export default commentsSlice.reducer;
