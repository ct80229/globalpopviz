import React, { useEffect, useState } from 'react';
import { Pie } from 'react-chartjs-2';
import { Chart, ArcElement, CategoryScale } from 'chart.js'; // Import the necessary Chart.js elements
import axios from 'axios';

// Register the necessary Chart.js elements
Chart.register(ArcElement, CategoryScale);

const PieChartComponent = ({ searchCountry }) => {
  const [countryPopulation, setCountryPopulation] = useState(0);
  const [worldPopulation, setWorldPopulation] = useState(0);

  useEffect(() => {
    const fetchPopulationData = async () => {
      try {
        const response = await axios.get('http://localhost:8000/api/population-graph/', {
          params: {
            dataType: 'totalPopulation',
            countryName: searchCountry,
          },
        });

        const { values } = response.data;
        setCountryPopulation(values[values.length - 1]); // Assuming the last value is the latest
      } catch (error) {
        console.error('Error fetching population data for pie chart:', error);
      }

      try {
        const response = await axios.get('http://localhost:8000/api/population-graph/', {
          params: {
            dataType: 'totalPopulation',
            countryName: 'World',
          },
        });

        const { values } = response.data;
        setWorldPopulation(values[values.length - 1]); // Assuming the last value is the latest
      } catch (error) {
        console.error('Error fetching world population data for pie chart:', error);
      }
    };

    fetchPopulationData();
  }, [searchCountry]);

  const pieData = {
    labels: ['Country Population', 'Rest of the World'],
    datasets: [
      {
        data: [countryPopulation, worldPopulation - countryPopulation],
        backgroundColor: ['rgba(75, 192, 192, 0.6)', 'rgba(255, 99, 132, 0.6)'], // Change colors here
        borderColor: ['rgba(75, 192, 192, 1)', 'rgba(255, 99, 132, 1)'],
        borderWidth: 2,
      },
    ],
  };

  const pieOptions = {
    responsive: true,
    plugins: {
      legend: {
        display: true,
        position: 'top',
      },
      tooltip: {
        callbacks: {
          label: (context) => {
            const label = context.label || '';
            const value = context.parsed || '';
            return `${label}: ${value} people`;
          },
        },
      },
    },
  };

  const countryPercentage = ((countryPopulation / worldPopulation) * 100).toFixed(2);

return (
  <div className="pie-chart-component">
    <div className="chart-with-label">
    <Pie data={pieData} options={pieOptions} style={{ width: '100px', height: '100px' }} />
      <div className="percentage-label" style={{ fontSize: '20px' }}>
        {searchCountry} makes up {countryPercentage}% of the global population.
      </div>
    </div>
    <div className="text-area">
      {/* Insert your text input or textarea here */}
    </div>
  </div>
);
};

export default PieChartComponent;