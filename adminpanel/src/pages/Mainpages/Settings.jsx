import React from 'react'
import '../../App.css'
import ReportsList from '../../components/TestFetchReports/TestFetchReports';

const settings = () => {
  return (
    <div className="flex justify-center items-center h-screen">
      <h1 className="text-4xl font-bold fade-in">Settings</h1>
      < ReportsList />

    </div>
  )
}

export default settings