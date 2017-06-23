import React from 'react'

const LoginChildren = (props, context) => {
  return <div>{props.children}</div>
}

LoginChildren.contextTypes = {
  routerContext: React.PropTypes.object
}

export default store => ({
  path: '/',

  getComponent(nextState, cb) {
    require.ensure([], () => {
      cb(null, {
        hideHeader: true,
        children: LoginChildren
      })
    })
  },

  getChildRoutes (partialNextState, cb) {
    require.ensure([], (require) => {
      cb(null, [
        require('./routes/Login').default(store)
      ])
    })
  },
})

