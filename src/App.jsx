import React from 'react';
import { observer, useLocalStore } from 'mobx-react';
import { ReactQueryDevtools } from 'react-query-devtools';

import StoreContext, { Store } from './store';
import { Search, Maps } from './components';

const App = observer(() => {
  const store = useLocalStore(Store);

  // const getCityWithLocation = async (lat, lon) => {
  //   const { data } = await axios.get(`${API}/city?lat=${lat}&lon=${lon}`);
  //   if (data) {
  //     setUser([lat, lon], data);
  //   }
  // };

  // const getLocation = () => {
  //   if ('geolocation' in navigator) {
  //     navigator.geolocation.getCurrentPosition(
  //       ({ coords }) => {
  //         const { latitude, longitude } = coords;
  //         getCityWithLocation(latitude, longitude);
  //       },
  //       () => {},
  //       { enableHighAccuracy: true }
  //     );
  //   }
  // };

  // useEffect(() => {
  //   getLocation();
  // }, []);

  return (
    <StoreContext.Provider value={store}>
      <Search />
      <Maps />
      <ReactQueryDevtools initailIsOpen />
    </StoreContext.Provider>
  );
});

export default App;
