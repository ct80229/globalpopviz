// src/components/PredictionComponent.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const PredictionComponent = () => {
  const [predictionData, setPredictionData] = useState([]);

  useEffect(() => {
    axios.get('/api/predictions/')
      .then((response) => {
        setPredictionData(response.data.data);
      })
      .catch((error) => {
        console.error('Error fetching prediction data:', error);
      });
  }, []);

  return (
    <div>
      <h2>Prediction Data</h2>
      <ul>
        {predictionData.map((item) => (
          <li key={item.country}>
            {item.country}: {item.prediction}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PredictionComponent;
