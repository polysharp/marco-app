import React from 'react';
import { observable, action } from 'mobx';

export const Store = () => {
  const store = observable({
    user: {
      location: ['48.882767', '2.176930'],
      city: '',
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

    setUser: action((location, city) => {
      store.user.location = location;
      store.user.city = city;
    }),
    setUserLocation: action((location) => {
      store.user.location = location;
    }),
    setUserCity: action((city) => {
      store.user.city = city;
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
