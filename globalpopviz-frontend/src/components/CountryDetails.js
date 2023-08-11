import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const CountryDetails = () => {
  const { countryName } = useParams(); // Extract the countryName parameter from the URL
  const [countryDetails, setCountryDetails] = useState(null);

  useEffect(() => {
    const fetchCountryDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/api/country-details/?countryName=${countryName}`);
        setCountryDetails(response.data); // Set the fetched country details in state
      } catch (error) {
        console.error('Error fetching country details:', error);
      }
    };

    fetchCountryDetails();
  }, [countryName]);

  // Render the country details
  return (
    <div>
      {/* Render the country details */}
      {countryDetails && (
        <div>
          <h2>{countryDetails.name}</h2>
          {/* Render other country details */}
        </div>
      )}
    </div>
  );
};

export default CountryDetails;
