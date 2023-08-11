import React from 'react';
import { Routes, Route } from 'react-router-dom';
import CountryDetails from './components/CountryDetails';
import MainLayout from './MainLayout';

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<MainLayout />} />
      <Route path="/country/:countryName" element={<CountryDetails />} />
    </Routes>
  );
};

export default AppRoutes;
