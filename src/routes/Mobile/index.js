import React from 'react'

const Mobile = (props, context) => {
  context.displayHeader = function () {
    return false
  }
  return <div><h1>sadfasdf</h1></div>
}

Mobile.contextTypes = {
  routerContext: React.PropTypes.object
}

export default store => ({
  path: 'm',
  getComponent(nextState, cb) {
    console.log(nextState)
    require.ensure([], (require) => {
      cb(null, {
        aaa     : false,
        children: Mobile
      })
    })

  }

})


