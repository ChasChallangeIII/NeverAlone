import { useSelector } from 'react-redux';
import { Line } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    LineElement,
    PointElement,
    CategoryScale,
    LinearScale,
    Tooltip,
    Legend
    } from 'chart.js';
    import { format, startOfWeek, addWeeks, subWeeks, eachWeekOfInterval, getISOWeek } from 'date-fns';

    ChartJS.register(LineElement, PointElement, CategoryScale, LinearScale, Tooltip, Legend);

    const WeeklyReportChart = () => {
    const reports = useSelector(state => state.reports.items);


    const end = new Date();
    const start = subWeeks(end, 7);
    const weeks = eachWeekOfInterval({ start, end });

    const reportCounts = {};
    weeks.forEach(weekStart => {
        const label = format(weekStart, "'v.'II yyyy"); 
        reportCounts[label] = 0;
    });


    reports.forEach(report => {
        const date = new Date(report.time || new Date());
        if (isNaN(date)) return;

        const weekStart = startOfWeek(date, { weekStartsOn: 1 }); 
        const label = format(weekStart, "'v.'II yyyy");

        if (reportCounts[label] !== undefined) {
        reportCounts[label]++;
        }
    });

    const labels = Object.keys(reportCounts);
    const data = {
        labels,
        datasets: [
        {
            label: 'Rapporter per vecka',
            data: Object.values(reportCounts),
            fill: false,
            borderColor: '#28a745',
            tension: 0.3,
        }
        ]
    };

    const options = {
        responsive: true,
        plugins: {
        legend: { display: true }
        },
        scales: {
        y: {
            beginAtZero: true,
            ticks: {
            stepSize: 1
            }
        }
        }
    };

    return (
        <div style={{ maxWidth: '800px', margin: '2rem auto' }}>
        <h3 style={{ textAlign: 'center' }}>Rapporter per vecka - senaste 8 veckorna</h3>
        <Line data={data} options={options} />
        </div>
    );
};

export default WeeklyReportChart;
