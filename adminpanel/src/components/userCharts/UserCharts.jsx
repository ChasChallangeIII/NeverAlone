import React, { useState, useEffect } from 'react';
import { Bar, Pie, Line } from 'react-chartjs-2'; 
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
    ArcElement,
    PointElement,
    LineElement
} from 'chart.js';

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
    ArcElement,
    PointElement,
    LineElement
);

const UserStats = () => {
    const [userData, setUserData] = useState([]);
    const [genderData, setGenderData] = useState({});
    const [birthDateData, setBirthDateData] = useState({});

    useEffect(() => {
        fetch('http://localhost:8080/api/users')
            .then(response => response.json())
            .then(data => {
                setUserData(data);
                processGenderData(data);
                processBirthDateData(data);
            })
            .catch(error => console.error('Error fetching user data:', error));
    }, []);

    const processGenderData = (data) => {
        const genderCount = data.reduce((acc, user) => {
            const gender = user.gender?.toLowerCase() || 'unknown';
            acc[gender] = (acc[gender] || 0) + 1;
            return acc;
        }, {});
        setGenderData(genderCount);
    };

    const processBirthDateData = (data) => {
        const birthDateCount = data.reduce((acc, user) => {
            const year = new Date(user.birth_date).getFullYear();
            acc[year] = (acc[year] || 0) + 1;
            return acc;
        }, {});
        setBirthDateData(birthDateCount);
    };

    const totalUsersData = {
        labels: ['Antal användare'],
        datasets: [{
            label: 'Summerat:',
            data: [userData.length],
            backgroundColor: 'rgba(75, 192, 192, 0.5)',
            borderColor: 'rgba(75, 192, 192, 1)',
            borderWidth: 1,
        }]
    };

    const genderChartData = {
        labels: Object.keys(genderData),
        datasets: [{
            data: Object.values(genderData),
            backgroundColor: ['#ff6384', '#36a2eb', '#cc65fe', '#ffcd56'],
            hoverBackgroundColor: ['#ff6384', '#36a2eb', '#cc65fe', '#ffcd56'],
        }]
    };

    const birthDateChartData = {
        labels: Object.keys(birthDateData),
        datasets: [{
            label: 'Åldersfördelning:',
            data: Object.values(birthDateData),
            fill: false,
            borderColor: 'rgba(153, 102, 255, 1)',
            backgroundColor: 'rgba(153, 102, 255, 0.2)',
            tension: 0.1
        }]
    };

return (
    <div className="flex flex-wrap justify-center gap-12 p-6">
        <div className="w-full lg:w-[32%] bg-white rounded-xl shadow-md p-4">
        <h2 className="text-center font-semibold text-lg mb-4">Antal användare</h2>
        <Bar data={totalUsersData} />
        </div>

        <div className="w-full lg:w-[32%] bg-white rounded-xl shadow-md p-4">
        <h2 className="text-center font-semibold text-lg mb-4">Könsfördelning</h2>
        <Pie data={genderChartData} />
        </div>

        <div className="w-full lg:w-[32%] bg-white rounded-xl shadow-md p-4">
        <h2 className="text-center font-semibold text-lg mb-4">Ålder per användare</h2>
        <Line data={birthDateChartData} />
        </div>
    </div>
);
};

export default UserStats;
