import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { Container, Typography } from '@mui/material'; // Import Container and Typography from @mui/material
import PopulationComponent from './components/PopulationComponent';
import MapComponent from './components/MapComponent';
import LineGraphComponent from './components/LineGraphComponent';
import PieChartComponent from './components/PieChartComponent';
import './App.css';

const App = () => {
  return (
    <Router>
      <div className="App">
        {/* set container */}
        <Container>
          {/* dashboard header */}
          <Typography variant="h1">Dashboard</Typography>

          {/* map component beneath header */}
          <MapComponent />

          {/* population component */}
          <PopulationComponent />

          {/* line graph of pop changes */}
          <LineGraphComponent />

          {/* pie chart of pop proportions */}
          <PieChartComponent />
        </Container>
      </div>
    </Router>
  );
};

export default App;
