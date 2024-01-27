import React from 'react';
import { useSelector } from 'react-redux';

const Dashboard = () => {
  const accessToken = useSelector((state) => state.user.accessToken);

  return <div>{accessToken && <h1>Dashboard</h1>}</div>;
};

export default Dashboard;
