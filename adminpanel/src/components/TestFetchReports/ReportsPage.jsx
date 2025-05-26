import React, { useEffect, useState } from 'react';

const ReportsPage = () => {
    const [reports, setReports] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        // Hämta token från localStorage
        const token = localStorage.getItem('authToken');

        // Om det finns en token, inkludera den i headers
const fetchReports = async () => {
    try {
        // Hämta token från localStorage
        const token = localStorage.getItem('authToken');

        // Om token finns, inkludera den i headers
        const response = await fetch('/api/reports', {
            method: 'GET',
            headers: {
                'Authorization': token ? `Bearer ${token}` : '', // Skickar token om den finns
                'Content-Type': 'application/json',
            },
        });

        if (!response.ok) {
            throw new Error('Något gick fel med hämtningen av rapporter.');
        }

        const data = await response.json();
        setReports(data.reports); // Sätt rapporterna i state
    } catch (error) {
        setError(error.message); // Hantera fel
    }
};

        fetchReports();
    }, []); // Kör bara en gång när komponenten laddas

    if (error) {
        return <div>Fel: {error}</div>;
    }

    return (
        <div>
            <h1>Rapporter</h1>
            {reports.length > 0 ? (
                <ul>
                    {reports.map((report, index) => (
                        <li key={index}>
                            <h3>{report.title}</h3>
                            <p>{report.description}</p>
                            <p><strong>Datum:</strong> {report.date}</p>
                        </li>
                    ))}
                </ul>
            ) : (
                <p>Inga rapporter tillgängliga.</p>
            )}
        </div>
    );
};

export default ReportsPage;
