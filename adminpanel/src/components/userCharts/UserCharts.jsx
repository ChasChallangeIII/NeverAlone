import React, { useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUsers } from '../../store/slices/userSlice';
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
    const dispatch = useDispatch();
    const users = useSelector((state) => state.users.list) ?? [];

    const loading = useSelector((state) => state.users.loading);
    const error = useSelector((state) => state.users.error);

    useEffect(() => {
        dispatch(fetchUsers());
    }, [dispatch]);


    const genderData = useMemo(() => {
        if (!users) return {};
        return users.reduce((acc, user) => {
        const gender = user.gender?.toLowerCase() || 'unknown';
        acc[gender] = (acc[gender] || 0) + 1;
        return acc;
        }, {});
    }, [users]);

    const birthDateData = useMemo(() => {
        if (!users) return {};
        return users.reduce((acc, user) => {
        const year = new Date(user.birth_date).getFullYear();
        acc[year] = (acc[year] || 0) + 1;
        return acc;
        }, {});
    }, [users]);

    if (loading) return <p>Laddar användardata...</p>;
    if (error) return <p>Fel vid hämtning: {error}</p>;

    const totalUsersData = {
        labels: ['Antal användare'],
        datasets: [{
        label: 'Summerat:',
        data: [users.length],
        backgroundColor: 'rgba(75, 192, 192, 0.5)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1,
        }],
    };

    const genderChartData = {
        labels: Object.keys(genderData),
        datasets: [{
        data: Object.values(genderData),
        backgroundColor: ['#ff6384', '#36a2eb', '#cc65fe', '#ffcd56'],
        hoverBackgroundColor: ['#ff6384', '#36a2eb', '#cc65fe', '#ffcd56'],
        }],
    };

    const birthDateChartData = {
        labels: Object.keys(birthDateData),
        datasets: [{
        label: 'Åldersfördelning:',
        data: Object.values(birthDateData),
        fill: false,
        borderColor: 'rgba(153, 102, 255, 1)',
        backgroundColor: 'rgba(153, 102, 255, 0.2)',
        tension: 0.1,
        }],
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
            <h2 className="text-center font-semibold text-lg mb-4">Födelseår per användare</h2>
            <Line data={birthDateChartData} />
        </div>
        </div>
    );
};

export default UserStats;