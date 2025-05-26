import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const API_URL = 'https://neveralone.onrender.com/admin/reports';



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

    if (!response.ok) {
        const errorText = await response.text();
        console.error('API error (text):', errorText);
        throw new Error(`Fel från API: ${response.status} - ${errorText}`);
    }

    const data = await response.json();

    const sortedReports = data.reports.sort((a, b) => new Date(b.time) - new Date(a.time));

    return sortedReports;
});

export const updateReportStatus = createAsyncThunk(
    'reports/updateStatus',
    async ({ reportId, newStatus }, { rejectWithValue }) => {
        const token = localStorage.getItem('token');

        try {
            const response = await fetch(`${API_URL}/${reportId}`, {
                method: 'PATCH',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ status: newStatus }),
            });

            if (!response.ok) {
                const errorText = await response.text();
                console.error('Fel vid statusuppdatering:', errorText);
                return rejectWithValue(errorText);
            }

            const updatedReport = await response.json();
            return updatedReport;
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

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