import React, { useContext, useState, useEffect, useRef } from 'react';
import { observer } from 'mobx-react';
import { useQuery } from 'react-query';

import StoreContext from '../store';

const API = 'https://marco-api.herokuapp.com/api/v1';

const searchQuery = async (search) => {
  const response = await fetch(`${API}/cities?search=${search.trim()}`);
  const data = await response.json();
  return data;
};

const Search = observer(() => {
  const { setUser } = useContext(StoreContext);

  const [search, setSearch] = useState('');
  const { data } = useQuery(search, searchQuery);

  const ref = useRef(null);
  const [showCities, setShowCities] = useState(false);

  const handleCitySelect = (el) => {
    setUser(el.coordinates, el);
    setSearch(`${el.name}, ${el.zip[0]}`);
  };

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (ref.current && !ref.current.contains(e.target)) {
        setShowCities(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [ref]);

  return (
    <div ref={ref}>
      <div className="bg-white shadow p-4 flex">
        <span className="w-auto flex justify-end items-center text-gray-500 p-2">L</span>
        <input
          name="search"
          type="text"
          placeholder="Essayez 'Paris'"
          aria-autocomplete="list"
          autoComplete="off"
          autoCorrect="off"
          spellCheck="false"
          className="w-1/2 rounded p-2"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          onClick={() => setShowCities(true)}
        />

        <button
          type="button"
          className="bg-red-400 hover:bg-red-300 rounded text-white p-2 pl-4 pr-4 font-semibold text-xs"
          onClick={() => console.log('Need to trigger query')}
        >
          Recherche
        </button>
      </div>
      <div>
        {showCities &&
          data &&
          data.length > 0 &&
          data.map((el, index) => (
            <button key={index} type="button" onClick={() => handleCitySelect(el)}>
              {`${el.name}(${el.zip[0]})`}
            </button>
          ))}
      </div>
    </div>
  );
});

export default Search;
