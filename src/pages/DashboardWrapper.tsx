import React from 'react';
import { DashboardProvider } from '../context/DashboardContext';
import DashboardPage from './DashboardPage';

const DashboardWrapper: React.FC = () => {
  return (
    <DashboardProvider>
      <DashboardPage />
    </DashboardProvider>
  );
};

export default DashboardWrapper;
