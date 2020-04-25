import React, { useState, useEffect } from 'react';
import { Map, Marker, Popup, TileLayer } from 'react-leaflet';
import { Icon } from 'leaflet';
import axios from 'axios';

import Spinner from './Spinner';

import * as marketsData from './markets-placeholder.json';

const API = 'https://marco-api.herokuapp.com/api/v1';

const App = () => {
  const [selectedMarket, setSelectedMarket] = useState(null);
  const [location, setLocation] = useState(['', '']);

  const [currentCity, setCurrentCity] = useState('');
  const [search, setSearch] = useState('');

  const [cities, setCities] = useState([]);

  const onLocationChanged = async (lat, lon) => {
    setLocation([lat, lon]);
    console.log('Location set :', lat, lon);

    const { data } = await axios.get(`${API}/city?lat=${lat}&lon=${lon}`);
    if (data) {
      setCurrentCity(data);
      setSearch(`${data.name}, ${data.zip[0]}`);
    }
  };

  useEffect(() => {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(
        ({ coords }) => {
          onLocationChanged(coords.latitude, coords.longitude);
        },
        (error) => {
          console.log(error);
        },
        { enableHighAccuracy: true }
      );
    } else {
      console.log('Geolocation is not available. User has to type manually.');
    }
  }, []);

  const handleSearch = async (e) => {
    const query = e.target.value;
    setSearch(query);

    const { data } = await axios.get(`${API}/cities?search=${query}`);
    setCities(data);
  };

  const selectCity = (city) => {
    setSearch(`${city.name}, ${city.zip[0]}`);
    setCurrentCity(city);
    setCities([]);
  };

  if (location[0] === '' && location[1] === '') {
    return <Spinner />;
  }

  return (
    <>
      <input
        type="text"
        value={search}
        onChange={(e) => handleSearch(e)}
        placeholder="Ville ou Code Postal ou Dept"
      />

      {cities.length > 0 &&
        cities.map((city, index) => (
          <button key={index} type="button" onClick={() => selectCity(city)}>
            {city.name}
          </button>
        ))}

      <Map center={location} zoom={14}>
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        />

        {marketsData.markets.map((market) => (
          <Marker
            key={market.id}
            position={market.coords}
            onclick={() => setSelectedMarket(market)}
          />
        ))}

        {selectedMarket && (
          <Popup
            position={selectedMarket.coords}
            onClose={() => setSelectedMarket(null)}
            className="leaf-popup"
          >
            <div>
              <h2>{selectedMarket.name}</h2>
            </div>
          </Popup>
        )}
      </Map>
    </>
  );
};

export default App;
