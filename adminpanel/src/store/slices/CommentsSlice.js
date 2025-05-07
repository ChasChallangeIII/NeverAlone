import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const fetchCommentsByReportId = createAsyncThunk(
    'comments/fetchByReportId',
    async (reportId) => {
    const res = await fetch(`/api/comments`);
    const data = await res.json();

    // Filtrera på report_id
    return { reportId, comments: data.filter(c => c.report_id === reportId) };
    }
);


export const postComment = createAsyncThunk(
    'comments/postComment',
    async (commentData, { dispatch }) => {
    const res = await fetch('/api/comments', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(commentData),
    });

    const newComment = await res.json();


    dispatch(fetchCommentsByReportId(commentData.report_id));
    return newComment;
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
