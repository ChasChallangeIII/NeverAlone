import { useSelector } from 'react-redux';
import { Bar } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    BarElement,
    CategoryScale,
    LinearScale,
    Tooltip,
    Legend
} from 'chart.js';

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

const CityReportChart = () => {
    const reports = useSelector(state => state.reports.items);


    const cityCounts = {};
    reports.forEach(report => {
        const city = report.city?.trim() || 'Okänd';
        cityCounts[city] = (cityCounts[city] || 0) + 1;
    });

    const labels = Object.keys(cityCounts);
    const data = {
        labels,
        datasets: [
        {
            label: 'Antal rapporter per stad',
            data: Object.values(cityCounts),
            backgroundColor: '#17a2b8',
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
        <h3 style={{ textAlign: 'center' }}>Rapporter per stad</h3>
        <Bar data={data} options={options} />
        </div>
    );
};

export default CityReportChart;
