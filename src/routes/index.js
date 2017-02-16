// We only need to import the modules necessary for initial render
import "babel-polyfill"

import CoreLayout from '../layouts/CoreLayout/CoreLayout'
import Home from './Home'
import Demo from './Demo'
import Mobile from './Mobile'
import Login from './Login'

import Apps from './Apps'
import Widgets from './Widgets'
import Hardware from './Hardware'

import '../styles/_base.scss'

/*  Note: Instead of using JSX, we recommend using react-router
 PlainRoute objects to build route definitions.   */

export const createRoutes = (store) => ({
  path       : '/',
  component  : CoreLayout,
  indexRoute : Home,
  childRoutes: [
    Mobile(store),
    Login(store),
    Demo(store),
    Apps(store),
    Widgets(store),
    Hardware(store)
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
