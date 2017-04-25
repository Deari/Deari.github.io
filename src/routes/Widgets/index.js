import React from 'react'
// import Main from './components/Main'
import AppStore from 'business/AppStore/Container'

class Main extends React.Component {
  render () {
    const tag = this.props.location.query.tagId || 'all';
    return <AppStore type='widgets' tag={tag}></AppStore>
  }
}

export default (store) => ({
  path: 'widgets',
  
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
        require('./routes/Doc'),
        require('./routes/Analytics/List').default,
        require('./routes/Analytics/OverView').default
      ])
    })
  }
})
