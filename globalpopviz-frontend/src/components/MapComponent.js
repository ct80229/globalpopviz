import React, { useEffect, useState } from 'react';
import { ComposableMap, Geographies, Geography, Graticule } from 'react-simple-maps';
import axios from 'axios';
import { scaleLinear } from 'd3-scale';
import { interpolateBlues } from 'd3-scale-chromatic';
import Slider from '@mui/material/Slider';
import { useNavigate } from 'react-router-dom';


//set up map element, use reactsimplemaps
const MapComponent = () => {
  const [populationData, setPopulationData] = useState([]);
  const [minPopulation, setMinPopulation] = useState(0);
  const [maxPopulation, setMaxPopulation] = useState(0);
  const [selectedYear, setSelectedYear] = useState(2022);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchGlobalPopulation = async (year) => {
      try {
        //access backend for population data, for now set to 2022
        const response = await axios.get(`http://localhost:8000/api/population/?year=${year}`);
        setPopulationData(response.data.population_data);
        
        // calculate the min and max population values
        const populations = response.data.population_data.map((data) => data.population);
        setMinPopulation(Math.min(...populations));
        setMaxPopulation(Math.max(...populations));
        console.log('Population Data:', response.data.population_data);
      } catch (error) {
        console.error('Error fetching global population:', error); //if countries' pops aren't sent
      }
    };

    fetchGlobalPopulation(selectedYear);
  }, [selectedYear]);

  //dynamic color scale using d3 chromatic, get shades of blue
  const colorScale = (population) => {
    const scale = scaleLinear()
      .domain([minPopulation, maxPopulation])
      .range([0.2, 30]);
    return interpolateBlues(scale(population));

  };


  //render, remove/change later
  return (
    <div className="map-component">
      {/* The map component */}
      <ComposableMap
        projection="geoEqualEarth"
        projectionConfig={{
          scale: 200,
        }}
        style={{ width: '100%', height: '500' }}
      >
        <Graticule stroke="#EAEAEC" />
        <Geographies geography="/countries.geojson">
          {({ geographies }) =>
            geographies.map((geo) => {
              const countryData = populationData.find((data) => data.country__name === geo.properties.ADMIN);
              if (countryData) {
                const population = countryData.population;

                return (
                  <Geography
                    key={geo.rsmKey}
                    geography={geo}
                    onClick={() => {
                      navigate(`/country/${geo.properties.ADMIN}`); // Navigate to the new page
                    }}
                    style={{
                      default: {
                        fill: population ? colorScale(population) : '#F5F4F6',
                        outline: 'none',
                      },
                      hover: {
                        fill: '#F53',
                        outline: 'none',
                      },
                      pressed: {
                        fill: '#E42',
                        outline: 'none',
                      },
                    }}
                  />
                );
              } else {
                return null;
              }
            })
          }
        </Geographies>
      </ComposableMap>

      {/* Slider component */}
      <div className="slider-container">
        <Slider
          value={selectedYear}
          min={1960}
          max={2022}
          step={1}
          onChange={(event, value) => setSelectedYear(value)}
          aria-labelledby="year-slider"
        />
        <span>{selectedYear}</span> {/* display the selected year */}
      </div>
    </div>
  );
};

export default MapComponent;