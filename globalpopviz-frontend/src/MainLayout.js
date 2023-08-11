import React from 'react';
import { Outlet } from 'react-router-dom';
import { Container, Typography, Grid } from '@mui/material';
import MapComponent from './components/MapComponent';
import PopulationComponent from './components/PopulationComponent';
import LineGraphComponent from './components/LineGraphComponent';

const MainLayout = () => {
  return (
    <div className="App">
      <Container style={{ minHeight: '100vh' }}>
        <Typography variant="h1" align="center" style={{ marginBottom: '20px' }}>Population Visualizer</Typography>

        <Grid container spacing={3} justifyContent="center" alignItems="center">
          <Grid item xs={12}>
            <MapComponent />
          </Grid>
          <Grid item xs={12}>
            <Typography variant="h3" align="center" style={{ fontSize: '30px', margin: '20px 0' }}>
              <PopulationComponent />
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <LineGraphComponent />
          </Grid>
          <Grid item xs={12}>
            <Typography variant="h3" align="center" style={{ margin: '20px 0' }}>
              Population Change from 1960-2022
            </Typography>
          </Grid>
        </Grid>
        {/* render nested routes */}
        <Outlet />
      </Container>
    </div>
  );
};

export default MainLayout;
