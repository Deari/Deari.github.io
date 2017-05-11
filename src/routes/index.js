// We only need to import the modules necessary for initial render
import 'babel-polyfill'

import CoreLayout from '../layouts/CoreLayout/CoreLayout'
import Home from './Home'
import Demo from './Demo'
import Login from './Login/Login'
import Apps from './Apps'
import Widgets from './Widgets'
import Hardware from './Hardware'
import '../styles/_base.scss'

export const createRoutes = (store) => ({
  path       : '/',
  onEnter: (nextState, replace, callback) => {

    if(nextState.location.pathname == '/login') {
      callback()
    }
    const cookieArr = document.cookie.split(";")
    const cookieObj = {
      mix: false,
      uid: false
    }
    cookieArr.map((item, index) => {
      if(item) {
        const arr = item.split("=")
        const name = arr[0] && arr[0].trim()
        const value = arr[1] && arr[1].trim()
        if (name == "WG-PPC-test1" && value) {
          cookieObj.mix = true
        }
        if (name == "WG-PPC-test2" && value) {
          cookieObj.uid = true
        }
      }
     
    })

    if (cookieObj.mix && cookieObj.uid) {
      callback()
    } else {
      replace('/login')
      callback();
    }
  },
  component  : CoreLayout,
  indexRoute : Home,
  childRoutes: [
    Demo(store),
    Apps(store),
    Widgets(store),
    Hardware(store),
    Login(store)
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
