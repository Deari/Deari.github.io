// We only need to import the modules necessary for initial render
import "babel-polyfill"

import CoreLayout from '../layouts/CoreLayout/CoreLayout'
import Home from './Home'
import Open from './Open'
import Shop from './Shop'
import Developer from './Developer'
import Demo from './Demo'
import Mobile from './Mobile'
import '../styles/_base.scss'

/*  Note: Instead of using JSX, we recommend using react-router
 PlainRoute objects to build route definitions.   */

export const createRoutes = (store) => ({
  path       : '/',
  component  : CoreLayout,
  indexRoute : Home,
  childRoutes: [
    Mobile(store),
    Open(store),
    Shop(store),
    Developer(store),
    Demo(store)
  ]
})

/*  Note: childRoutes can be chunked or otherwise loaded programmatically
 using getChildRoutes with the following signature:

 getChildRoutes (location, cb) {
 require.ensure([], (require) => {
 cb(null, [
 // Remove imports!
 require('./Counter').default(store)
 ])
 })
 }

 However, this is not necessary for code-splitting! It simply provides
 an API for async route definitions. Your code splitting should occur
 inside the route `getComponent` function, since it is only invoked
 when the route exists and matches.
 */

export default createRoutes
