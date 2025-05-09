import React, { useState, useEffect, useRef } from 'react';
import { Bar, Pie, Line } from 'react-chartjs-2'; 
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement);

const UserStats = () => {
    const [userData, setUserData] = useState([]);
    const [genderData, setGenderData] = useState([]);
    const [birthDateData, setBirthDateData] = useState([]);
    
    const chartRef = useRef(null); 

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
            const gender = user.gender.toLowerCase();
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
        labels: ['Total Users'],
        datasets: [{
            label: 'Users Count',
            data: [userData.length],
            backgroundColor: 'rgba(75, 192, 192, 0.2)',
            borderColor: 'rgba(75, 192, 192, 1)',
            borderWidth: 1,
        }]
    };


    const genderChartData = {
        labels: Object.keys(genderData),
        datasets: [{
            data: Object.values(genderData),
            backgroundColor: ['#ff6384', '#36a2eb', '#cc65fe'],
            hoverBackgroundColor: ['#ff6384', '#36a2eb', '#cc65fe'],
        }]
    };

        const birthDateChartData = {
        labels: Object.keys(birthDateData),
        datasets: [{
            label: 'Users by Birth Year',
            data: Object.values(birthDateData),
            fill: false,
            borderColor: 'rgba(153, 102, 255, 1)',
            tension: 0.1
        }]
    };


    useEffect(() => {
        if (chartRef.current) {
            chartRef.current.destroy();
        }
    }, [userData]);

    return (
        <div>
            <h1>User Statistics</h1>

            <div>
                <h2>Total Users</h2>
                <Bar ref={chartRef} data={totalUsersData} />
            </div>
            <div>
                <h2>Gender Distribution</h2>
                <Pie ref={chartRef} data={genderChartData} />
            </div>
            <div>
                <h2>Users by Birth Year</h2>
                <Line ref={chartRef} data={birthDateChartData} />
            </div>
        </div>
    );
};

export default UserStats;
