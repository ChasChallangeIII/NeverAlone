import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const API_URL = 'http://localhost:8080/api/reports';

export const fetchReports = createAsyncThunk('reports/fetchReports', async () => {
    const token = localStorage.getItem('token');
    
    if (!token) {
        throw new Error('Ingen token, vänligen logga in igen.');
    }

    const response = await fetch(API_URL, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
        },
    });

    console.log("API Response:", response); 
    console.log("Request Headers:", {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
    });

    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Kunde inte hämta rapporter');
    }

    const data = await response.json();
    return data.reports;
});

const reportsSlice = createSlice({
    name: 'reports',
    initialState: {
        items: [],
        loading: false,
        error: null,
    },
    reducers: {
        markReportAsHandled: (state, action) => {
            const report = state.items.find(r => r.id === action.payload);
            if (report) {
                report.is_handled = true;
            }
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchReports.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchReports.fulfilled, (state, action) => {
                state.loading = false;
                state.items = action.payload;
            })
            .addCase(fetchReports.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            });
    },
});

export const { markReportAsHandled } = reportsSlice.actions;
export default reportsSlice.reducer;