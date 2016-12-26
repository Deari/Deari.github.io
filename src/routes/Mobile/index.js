import React from 'react'

const Mobile = (props, context) => {
  return <div>{props.children}</div>
}

Mobile.contextTypes = {
  routerContext: React.PropTypes.object
}

export default store => ({
  path: 'm',

  getComponent(nextState, cb) {
    require.ensure([], (require) => {
      cb(null, {
        hideHeader: true,
        children  : Mobile
      })
    })
  },


  getChildRoutes (partialNextState, cb) {
    require.ensure([], (require) => {
      cb(null, [
        require('../Shop/routes/Editor')(store),
      ])
    })
  },

})

