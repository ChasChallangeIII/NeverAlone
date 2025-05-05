import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const API_URL = 'https://neveralone.onrender.com/admin/report_comments';


export const fetchCommentsByReportId = createAsyncThunk(
    'reportComments/fetchByReportId',
    async (reportId) => {
    const response = await fetch(`${API_URL}?report_id=${reportId}`);
    const data = await response.json();
    return { reportId, comments: data.comments };
    }
);


export const postComment = createAsyncThunk(
    'reportComments/postComment',
    async ({ report_id, admin_id, comment }) => {
        const response = await fetch(API_URL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ report_id, admin_id, comment }),
        });

        const data = await response.json();
        return { report_id, comment: data.comment }; 
    }
);

const reportCommentsSlice = createSlice({
    name: 'reportComments',
    initialState: {
        commentsByReport: {}, 
        loading: false,
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
        .addCase(fetchCommentsByReportId.pending, (state) => {
            state.loading = true;
        })
        .addCase(fetchCommentsByReportId.fulfilled, (state, action) => {
            const { reportId, comments } = action.payload;
            state.commentsByReport[reportId] = comments;
            state.loading = false;
        })
        .addCase(fetchCommentsByReportId.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message;
        })
        .addCase(postComment.fulfilled, (state, action) => {
            const { report_id, comment } = action.payload;
            if (!state.commentsByReport[report_id]) {
            state.commentsByReport[report_id] = [];
            }
            state.commentsByReport[report_id].push(comment);
        });
    },
});

export default reportCommentsSlice.reducer;
