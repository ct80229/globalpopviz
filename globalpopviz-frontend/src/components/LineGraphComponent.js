import React, { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import axios from 'axios';
import { CategoryScale, Chart, LineElement, LinearScale, PointElement} from "chart.js";
Chart.register(CategoryScale, LinearScale, PointElement, LineElement);

//set up line graph
const LineGraphComponent = () => {
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

  //pulls data from population_graph_data in backend
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:8000/api/population-graph/', {
          params: {
            dataType: 'totalPopulation',
            countryName: 'World',//placeholder, displays global population
          },
        });
        const { labels, values } = response.data;
  
        setChartData((prevChartData) => ({
          ...prevChartData,
          labels: labels.map(String),
          datasets: [
            {
              ...prevChartData.datasets[0],
              data: values,
            },
          ],
        }));
      } catch (error) {
        console.error('Error fetching population graph data:', error);
      }
    };
  
    fetchData();
  }, []);

  return (
    <div className="line-graph-component">
      <Line data={chartData} />
    </div>
  );
};

export default LineGraphComponent;
