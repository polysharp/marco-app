import React, { useState, useEffect } from 'react';
import { Map, Marker, Popup, TileLayer } from 'react-leaflet';
import { Icon } from 'leaflet';

import * as markets from './markets-placeholder.json';

const defaultCoords = ['48.882767', '2.176930'];

const App = () => {
  const [selectedMarket, setSelectedMarket] = useState(null);

  useEffect(() => {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        console.log(position);
      });
    } else {
      console.log('Geolocation is not available. User has to type manually.');
    }
  }, []);

  return (
    <Map center={defaultCoords} zoom={14}>
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
