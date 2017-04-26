import React from 'react'
import AppStore from 'business/AppStore/Container'

class Main extends React.Component {
  render () {
    const tagId = this.props.location.query.tagId
    const tag = tagId ? tagId : 0;
    return <AppStore type='hardware' tag={tag}></AppStore>
  }
}

export default (store) => ({
  path: 'hardware',
  
  indexRoute: {
    component: Main
  },

  getChildRoutes(partialNextState, cb) {
    require.ensure([], (require) => {
      cb(null, [
        require('./routes/Create')(store),
        require('./routes/Detail')(store),
        require('./routes/List')(store),
        require('./routes/Editor')(store),
        require('./routes/Doc')
      ])
    })
  }
})
