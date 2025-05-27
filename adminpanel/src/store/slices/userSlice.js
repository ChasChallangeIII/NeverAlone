import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const API_URL = 'https://neveralone.onrender.com/admin/users';

export const fetchUsers = createAsyncThunk(
    'users/fetchUsers',
    async (_, thunkAPI) => {
        const token = thunkAPI.getState().auth.token;

        try {
        const response = await fetch('https://neveralone.onrender.com/admin/users', {
            headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
            },
        });

        if (!response.ok) throw new Error(`Nätverksfel: ${response.status}`);

        const data = await response.json();

        return data; 
        } catch (error) {
        return thunkAPI.rejectWithValue(error.message);
        }
    }
);

    const usersSlice = createSlice({
    name: 'users',
    initialState: {
        list: [],
        loading: false,
        error: null
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
        .addCase(fetchUsers.pending, (state) => {
            state.loading = true;
            state.error = null;
        })
        .addCase(fetchUsers.fulfilled, (state, action) => {
            state.loading = false;
            state.list = action.payload;
        })
        .addCase(fetchUsers.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload || 'Något gick fel';
        });
    }
});

export default usersSlice.reducer;
