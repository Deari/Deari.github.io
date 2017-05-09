// We only need to import the modules necessary for initial render
import "babel-polyfill"

import CoreLayout from '../layouts/CoreLayout/CoreLayout'
import Home from './Home'
import Demo from './Demo'
import Login from './Login'
import Apps from './Apps'
import DevTools from './DevTools'
import Widgets from './Widgets'
import Hardware from './Hardware'
import ApplyAccount from './ApplyAccount'
import '../styles/_base.scss'

export const createRoutes = (store) => ({
  path       : '/',
  component  : CoreLayout,
  indexRoute : Home,
  childRoutes: [
    Login(store),
    Demo(store),
    Apps(store),
    Widgets(store),
    Hardware(store),
    ApplyAccount,
    DevTools
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
