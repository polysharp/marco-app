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
  const { setCity, fetchCityPolygon } = useContext(StoreContext);

  const [search, setSearch] = useState('');
  const { data } = useQuery(search, searchQuery);

  const ref = useRef(null);
  const [showCities, setShowCities] = useState(false);

  const handleCitySelect = (el) => {
    setSearch(el.name);
    setCity(el.coordinates, el);
    setShowCities(false);
    fetchCityPolygon(el.zip[0]);
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
      <section className="bg-indigo-900">
        <div className="container mx-auto py-4 px-4">
          <input
            name="search"
            type="text"
            placeholder="Essayez 'Paris'"
            aria-autocomplete="list"
            autoComplete="off"
            autoCorrect="off"
            spellCheck="false"
            className="w-full h-12 rounded focus:outline-none focus:shadow-outline text-xl px-4 py-2 shadow-lg"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            onClick={() => setShowCities(true)}
          />
        </div>
      </section>
      <div>
        {showCities &&
          data &&
          data.length > 0 &&
          data.name &&
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
