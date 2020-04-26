import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';

const API = 'https://marco-api.herokuapp.com/api/v1';

const Search = ({ city, setCity }) => {
  const ref = useRef(null);
  const [cities, setCities] = useState([]);

  const [submitedValue, setSubmitedValue] = useState('');
  const [search, setSearch] = useState('');

  const [showCities, setShowCities] = useState(false);

  Search.handleClickOutside = () => setShowCities(false);

  useEffect(() => {
    if (!city) return;
    setSearch(`${city.name}, ${city.zip[0]}`);
  }, [city]);

  const handleSearch = async () => {
    if (search === submitedValue) return;

    setSubmitedValue(search);
    try {
      const { data } = await axios.get(`${API}/cities?search=${search.trim()}`);
      setCities(data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleCitySelect = (el) => {
    setCity(el);
    setCities([]);
  };

  useEffect(() => {
    handleSearch();
  }, [search]);

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
          onChange={(e) => setSearch(e.target.value.trim())}
          onClick={() => setShowCities(true)}
        />

        <button
          type="button"
          className="bg-red-400 hover:bg-red-300 rounded text-white p-2 pl-4 pr-4 font-semibold text-xs"
          onClick={() => handleSearch()}
        >
          Recherche
        </button>
      </div>
      {showCities &&
        cities.length > 0 &&
        cities.map((el, index) => (
          <button key={index} type="button" onClick={() => handleCitySelect(el)}>
            {`${el.name}(${el.zip[0]})`}
          </button>
        ))}
    </div>
  );
};

export default Search;
