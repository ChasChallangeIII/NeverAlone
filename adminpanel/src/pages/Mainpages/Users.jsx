import React from 'react';
import '../../App.css';
import '../../styles/Users.css'
import ReportChart from '../../components/ReportChart/ReportCharts';
import WeeklyChart from '../../components/ReportChart/WeeklyChart';
import CityChart from '../../components/ReportChart/CityChart';

const Users = () => {
  return (
    <div className="chart-page">
      <h1 className="users-title">Statistik över rapporter</h1>
      <ReportChart />
      < WeeklyChart />
      < CityChart />
    </div>

  );
};

export default Users;
