import React from 'react';
import { createBrowserRouter, RouterProvider, Routes, Route } from 'react-router-dom';
import MainLayout from './MainLayout'; // Import your MainLayout component
import CountryDetails from './components/CountryDetails';

const routes = [
  {
    path: '/',
    element: <MainLayout />, // Use MainLayout as the layout for the home route
  },
  {
    path: '/country/:countryName',
    element: <CountryDetails />,
  },
];

const App = () => {
  const router = createBrowserRouter(routes);

  return (
    <RouterProvider router={router}>
      <Routes>
        {/* Define your routes */}
      </Routes>
    </RouterProvider>
  );
};

export default App;
