import React, { useEffect, useState } from 'react';

const PopulationComponent = () => {
  const growthRate = 2.593; // People per second
  const initialPopulation = 8053028910; // initial pop from https://www.worldometers.info/world-population/
  const initialTimestamp = new Date('2023-08-08T00:32:00').getTime(); // convert inital time, 12:32
  const updateInterval = 500; // update interval, 0.5s

  const calculateCurrentPopulation = () => {
    const currentTimestamp = new Date().getTime();
    const timeDifferenceInSeconds = (currentTimestamp - initialTimestamp) / 1000;
    return initialPopulation + growthRate * timeDifferenceInSeconds;
  };

  const [globalPopulation, setGlobalPopulation] = useState(calculateCurrentPopulation());

  useEffect(() => {
    const interval = setInterval(() => {
      setGlobalPopulation(calculateCurrentPopulation());
    }, updateInterval);

    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <div className="global-population">
      {/* display constantly updating global population */}
      <h2>Current Global Population: {Math.round(globalPopulation)}</h2>
    </div>
  );
};

export default PopulationComponent;
