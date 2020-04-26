import React from 'react';
import { observable, action } from 'mobx';

const API = 'https://marco-api.herokuapp.com/api/v1';

export const Store = () => {
  const store = observable({
    city: {
      location: ['48.882767', '2.176930'],
      polygon: [],
      data: {},
    },
    markets: [
      {
        id: '1',
        name: "Place de l'église",
        description: 'Un super marché local',
        pictures: ['placeholder/img/250px/1', 'placeholder/img/250px/2', 'placeholder/img/250px/3'],
        adresse: "Place de l'église, Rueil Malmaison 92500",
        rating: {
          stars: 2,
          amount: 34,
        },
        schedules: [
          {
            open: true,
            times: ['', ''],
          },
          {
            open: true,
            times: ['', ''],
          },
          {
            open: true,
            times: ['', ''],
          },
          {
            open: false,
          },
          {
            open: true,
            times: ['', ''],
          },
          {
            open: false,
          },
          {
            open: false,
          },
        ],
        coords: ['48.876303', '2.180934'],
        state: {
          code: 4,
          at: '11111',
        },
      },
      {
        id: '2',
        name: 'Haut de Rueil',
        pictures: ['placeholder/img/250px/1', 'placeholder/img/250px/2', 'placeholder/img/250px/3'],
        adresse: "Place de l'église, Rueil Malmaison 92500",
        rating: {
          stars: 2,
          amount: 34,
        },
        schedules: [
          {
            open: true,
            times: ['', ''],
          },
          {
            open: true,
            times: ['', ''],
          },
          {
            open: true,
            times: ['', ''],
          },
          {
            open: false,
          },
          {
            open: true,
            times: ['', ''],
          },
          {
            open: false,
          },
          {
            open: false,
          },
        ],
        coords: ['48.872117', '2.194327'],
        state: {
          code: 4,
          at: '11111',
        },
      },
      {
        id: '3',
        name: 'Gare de Rueil',
        pictures: ['placeholder/img/250px/1', 'placeholder/img/250px/2', 'placeholder/img/250px/3'],
        adresse: "Place de l'église, Rueil Malmaison 92500",
        rating: {
          stars: 2,
          amount: 34,
        },
        schedules: [
          {
            open: true,
            times: ['', ''],
          },
          {
            open: true,
            times: ['', ''],
          },
          {
            open: true,
            times: ['', ''],
          },
          {
            open: false,
          },
          {
            open: true,
            times: ['', ''],
          },
          {
            open: false,
          },
          {
            open: false,
          },
        ],
        coords: ['48.887104', '2.171008'],
        state: {
          code: 4,
          at: '11111',
        },
      },
    ],
    market: null,
    setCity: action((location, data) => {
      store.city.location = location;
      store.city.data = data;
    }),
    fetchCityPolygon: action(async (zip) => {
      const response = await fetch(`${API}/city/${zip}/polygon`);
      if (response.ok) {
        const data = await response.json();
        store.city.polygon = data;
      } else {
        store.city.polygon = [];
      }
    }),
    setMarkets: action((markets) => {
      store.markets = markets;
    }),
    setMarket: action((market) => {
      store.market = market;
    }),
  });

  return store;
};

export default React.createContext();
