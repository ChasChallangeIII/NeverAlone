import React from 'react';
import UserStats from '../../components/userCharts/UserCharts';

const Profile = () => {
  return (
    <div className="min-h-screen flex flex-col items-center px-4">
      <h1 className="text-4xl font-bold mt-8 mb-4 text-center fade-in">
        Användarstatistik
      </h1>
      <UserStats />
    </div>
  );
};

export default Profile;
