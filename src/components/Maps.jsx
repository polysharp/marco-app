import React from 'react';
import PropTypes from 'prop-types';
import { Map, Marker, Popup, TileLayer } from 'react-leaflet';
import * as marketsData from '../markets-placeholder.json';

const Maps = ({ location, selectedMarket, setSelectedMarket }) => (
  <Map center={location} zoom={14}>
    <TileLayer
      url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
    />

    {marketsData.markets.map((market) => (
      <Marker key={market.id} position={market.coords} onclick={() => setSelectedMarket(market)} />
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

Maps.propTypes = {
  location: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.string),
    PropTypes.arrayOf(PropTypes.number),
  ]).isRequired,
  selectedMarket: PropTypes.shape({
    name: PropTypes.string,
    coords: PropTypes.arrayOf(PropTypes.string),
  }),
  setSelectedMarket: PropTypes.func.isRequired,
};

Maps.defaultProps = {
  selectedMarket: { name: '', coords: ['', ''] },
};

export default Maps;
