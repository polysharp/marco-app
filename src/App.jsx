import React, { useState, useEffect } from 'react';
import axios from 'axios';

import { Search, Maps } from './components';

const API = 'https://marco-api.herokuapp.com/api/v1';

const App = () => {
  const [selectedMarket, setSelectedMarket] = useState(null);
  const [location, setLocation] = useState(['48.8589101', '2.3120407']);

  const [city, setCity] = useState('');

  const getCityWithLocation = async (lat, lon) => {
    const { data } = await axios.get(`${API}/city?lat=${lat}&lon=${lon}`);
    if (data) {
      setCity(data);
    }
  };

  const getLocation = () => {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(
        ({ coords }) => {
          const { latitude, longitude } = coords;
          setLocation([latitude, longitude]);
          getCityWithLocation(latitude, longitude);
        },
        () => {},
        { enableHighAccuracy: true }
      );
    }
  };

  useEffect(() => {
    getLocation();
  }, []);

  const handleOnCitySelected = (el) => {
    console.log(el);
    setCity(el);
    setLocation(el.coordinates);
  };

  return (
    <>
      <Search city={city} setCity={handleOnCitySelected} />

      <Maps
        location={location}
        selectedMarket={selectedMarket}
        setSelectedMarket={setSelectedMarket}
      />
    </>
  );
};

export default App;
