import React from 'react';
import '../../App.css'
import MapComponent from '../../components/MapComponent/MapComponent';
import '../../components/MapComponent/MapComponent.css';

const Home = () => {
  return (
    <div className="flex flex-col items-center min-h-screen py-10">
      <h1 className="text-4xl font-bold fade-in mb-6">NeverAlone</h1>
      <MapComponent />
    </div>
  );
};

export default Home;
