import React, { useEffect, useState, useCallback } from 'react';
import { Line } from 'react-chartjs-2';
import axios from 'axios';
import { CategoryScale, Chart, LineElement, LinearScale, PointElement} from "chart.js";
Chart.register(CategoryScale, LinearScale, PointElement, LineElement);

//set up line graph
const LineGraphComponent = () => {
  const [selectedDataType, setSelectedDataType] = useState('totalPopulation')
  const [searchCountry, setSearchCountry] = useState('');
  const [chartData, setChartData] = useState({
    labels: [],
    datasets: [
      {
        label: 'World Population',
        data: [],
        borderColor: 'rgba(75,192,192,1)',
        fill: false,
      },
    ],
  });

  // Define fetchData using useCallback
  const fetchData = useCallback(async () => {
    try {
      let response;
      if (searchCountry) {
        response = await axios.get('http://localhost:8000/api/population-graph/', {
          params: {
            dataType: selectedDataType,
            countryName: searchCountry,
          },
        });
      } else {
        response = await axios.get('http://localhost:8000/api/population-graph/', {
          params: {
            dataType: selectedDataType,
            countryName: 'World', // placeholder for global data
          },
        });
      }

      const { labels, values } = response.data;

      setChartData((prevChartData) => ({
        ...prevChartData,
        labels: labels.map(String),
        datasets: [
          {
            ...prevChartData.datasets[0],
            label: searchCountry ? `Population of ${searchCountry}` : 'World Population',
            data: values,
          },
        ],
      }));
    } catch (error) {
      console.error('Error fetching population graph data:', error);
    }
  }, [searchCountry, selectedDataType]);

  useEffect(() => {
    fetchData(); 
  }, [searchCountry, selectedDataType, fetchData]);

  return (
    <div className="line-graph-component">
      <div className="toggle-container">
        <label>
          <input
            type="radio"
            value="totalPopulation"
            checked={selectedDataType === 'totalPopulation'}
            onChange={() => setSelectedDataType('totalPopulation')}
          />
          Total Population
        </label>
        <label>
          <input
            type="radio"
            value="percentGrowth"
            checked={selectedDataType === 'percentGrowth'}
            onChange={() => setSelectedDataType('percentGrowth')}
          />
          Percent Growth
        </label>
      </div>
      <input
        type="text"
        placeholder="Search for a country..."
        value={searchCountry}
        onChange={(e) => setSearchCountry(e.target.value)}
      />
      <Line data={chartData} />
    </div>
  );
};

export default LineGraphComponent;
