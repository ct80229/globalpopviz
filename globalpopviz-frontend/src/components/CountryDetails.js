import React from 'react';
import { useParams } from 'react-router-dom';
import LineGraphComponent from './LineGraphComponent';
import { Typography } from '@mui/material';
import PieChartComponent from './PieChartComponent';
import './CountryDetails.css'; // Import a CSS file for your custom styles

const CountryDetails = () => {
  const { countryName } = useParams();

  return (
    <div className="country-details-container">
      <div className="country-details">
        <Typography variant="h2">Country Details: {countryName}</Typography>
        <PieChartComponent searchCountry={countryName} />
        <div className="line-graph-container">
          <LineGraphComponent searchCountry={countryName} showSearchBar={false} />
        </div>
      </div>
    </div>
  );
};

export default CountryDetails;
