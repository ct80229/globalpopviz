import React from 'react';
import { useParams } from 'react-router-dom';
import LineGraphComponent from './LineGraphComponent';
import { Typography } from '@mui/material';

const CountryDetails = () => {
  const { countryName } = useParams();

  return (
    <div className="country-details">
      <Typography variant="h2">Country Details: {countryName}</Typography>
      {/* render other country details here */}
      <LineGraphComponent searchCountry={countryName} showSearchBar={false} />
    </div>
  );
};

export default CountryDetails;
