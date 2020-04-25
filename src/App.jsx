import React, { useState, useEffect } from 'react';
import { Map, Marker, Popup, TileLayer } from 'react-leaflet';
import { Icon } from 'leaflet';

import * as markets from './markets-placeholder.json';

const App = () => {
  const [selectedMarket, setSelectedMarket] = useState(null);
  const [location, setLocation] = useState(['', '']);

  const onLocationChanged = (lat, lon) => {
    setLocation([lat, lon]);
    console.log(`New location set to : ${lat} / ${lon}`);
    // TODO: CALL API TO GET ALL MARKET IN CITY (ZIP CODE);
  };

  useEffect(() => {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(({ coords }) => {
        onLocationChanged(coords.latitude, coords.longitude);
      });
    } else {
      console.log('Geolocation is not available. User has to type manually.');
    }
  }, []);

  return (
    <Map center={location} zoom={14}>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
      />

      {markets.items.map((market) => (
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
