import React from 'react';
import '../../App.css';
import '../../styles/Users.css'
import ReportChart from '../../components/ReportChart/ReportCharts';

const Users = () => {
  return (
    <div className="users-page">
      <h1 className="users-title">Statistik över rapporter</h1>
      <ReportChart />
    </div>
  );
};

export default Users;
