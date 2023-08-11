import React, { useEffect, useState, useCallback } from 'react';
import { Line } from 'react-chartjs-2';
import axios from 'axios';
import { CategoryScale, Chart, LineElement, LinearScale, PointElement} from "chart.js";
import './LineGraphComponent.css';
Chart.register(CategoryScale, LinearScale, PointElement, LineElement);


//set up line graph
const LineGraphComponent = ({ searchCountry, showSearchBar }) => {
  const [selectedDataType, setSelectedDataType] = useState('totalPopulation');
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

  // define fetchData using useCallback
  const fetchData = useCallback(async (countryName) => {
    try {
      let response;
      let countryParam = countryName;

      if (!countryName) {
        countryParam = 'World'; // set default for global data
      }

      response = await axios.get('http://localhost:8000/api/population-graph/', {
        params: {
          dataType: selectedDataType,
          countryName: countryParam,
        },
      });

      const { labels, values } = response.data;

      setChartData((prevChartData) => ({
        ...prevChartData,
        labels: labels.map(String),
        datasets: [
          {
            ...prevChartData.datasets[0],
            label: countryName ? `Population of ${countryName}` : 'World Population',
            data: values,
          },
        ],
      }));
    } catch (error) {
      console.error('Error fetching population graph data:', error);
    }
  }, [selectedDataType]);

  useEffect(() => {
    fetchData(searchCountry); 
  }, [searchCountry, selectedDataType, fetchData]);

  const setSearchCountry = (value) => {
    if (showSearchBar) {
      // only set searchCountry if showSearchBar is true
      fetchData(value); 
    }
  };

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
      {showSearchBar && (
      <div className="search-container">
        <input
          type="text"
          placeholder="Search for a country..."
          value={searchCountry}
          onChange={(e) => setSearchCountry(e.target.value)}
        />
      </div>
      )}
      <Line data={chartData} />
    </div>  
  );
};

LineGraphComponent.defaultProps = {
  showSearchBar: true, 
};
export default LineGraphComponent;