import React, { useContext } from 'react';
import { observer } from 'mobx-react';
import { Map, Marker, Popup, TileLayer, Polygon } from 'react-leaflet';

import StoreContext from '../store';

const Maps = observer(() => {
  const { city, markets, setMarket, market } = useContext(StoreContext);

  return (
    <Map center={city.location} zoom={14}>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
      />

      {city.polygon.length > 0 && <Polygon color="purple" positions={city.polygon} />}

      {markets.map((el) => (
        <Marker key={el.id} position={el.coords} onclick={() => setMarket(el)} />
      ))}

      {market && (
        <Popup position={market.coords} onClose={() => setMarket(null)} className="leaf-popup">
          <div>
            <h2>{market.name}</h2>
          </div>
        </Popup>
      )}
    </Map>
  );
});

export default Maps;
