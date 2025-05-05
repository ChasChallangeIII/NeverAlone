import { useSelector } from 'react-redux';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, LineElement, PointElement, CategoryScale, LinearScale, Tooltip, Legend } from 'chart.js';
import { format, subDays, eachDayOfInterval } from 'date-fns';

ChartJS.register(LineElement, PointElement, CategoryScale, LinearScale, Tooltip, Legend);

const ReportChart = () => {
    const reports = useSelector(state => state.reports.items);

    const days = eachDayOfInterval({
        start: subDays(new Date(), 29),
        end: new Date()
    });

    const reportCounts = {};
    days.forEach(day => {
        const dateStr = format(day, 'yyyy-MM-dd');
        reportCounts[dateStr] = 0;
    });

    reports.forEach(report => {
        let createdAt;
        if (report.time) {
        createdAt = new Date(report.time);
        } else {
        console.warn(`Rapport ID ${report.id} saknar time, använder nuvarande datum som fallback`);
        createdAt = new Date(); 
        }


        if (isNaN(createdAt)) {
        console.warn(`Ogiltigt datum för rapport med ID ${report.id}: ${report.time}`);
        return; 
        }

        const dateStr = format(createdAt, 'yyyy-MM-dd');
        if (reportCounts[dateStr] !== undefined) {
        reportCounts[dateStr]++;
        }
    });

    const labels = days.map(day => format(day, 'MMM d')); 
    const data = {
        labels,
        datasets: [
        {
        label: 'Rapporter per dag',
        data: Object.values(reportCounts),
        fill: false,
        borderColor: '#007bff',
            tension: 0.3,
        }
        ]
    };

    const options = {
        responsive: true,
        plugins: {
        legend: { display: true },
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
        <h3 style={{ textAlign: 'center' }}>Rapporter - senaste 30 dagarna</h3>
        <Line data={data} options={options} />
        </div>
    );
};

export default ReportChart;
