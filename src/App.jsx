import React, { useState, useEffect } from 'react';
import { Map, Marker, Popup, TileLayer } from 'react-leaflet';
import { Icon } from 'leaflet';

import Spinner from './Spinner';

import * as marketsData from './markets-placeholder.json';

const App = () => {
  const [selectedMarket, setSelectedMarket] = useState(null);
  const [location, setLocation] = useState(['', '']);

  const locationAvailable = location[0] !== '' && location[1] !== '';

  const onLocationChanged = (lat, lon) => {
    setLocation([lat, lon]);
    console.log(`New location set to : ${lat} / ${lon}`);
    // TODO: CALL API TO GET ALL MARKET IN CITY (ZIP CODE);
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

  if (!locationAvailable) {
    return <Spinner />;
  }

  return (
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
  );
};

export default App;
