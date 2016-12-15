import React from 'react'
import { IndexLink, Link } from 'react-router'
import Doc from './components/Doc';
import Layout from './components/Layout';

export default (store) => ({
  path: 'shop',
  component: Layout,

  indexRoute: {
    component: Doc,
  },

  getChildRoutes (partialNextState, cb) {
    require.ensure([], (require) => {
      cb(null, [
        require('./routes/ManageShop')(store),
        require('./routes/MyApps/Edit')(store),
      ])
    })
  },
})
