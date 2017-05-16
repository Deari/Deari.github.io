import Pagination from './components/Pagination'
import s from './index-new.scss'

const Test = () => (<div className={s.pageDemo}>
  <Pagination total={100} limit={10}></Pagination>
</div>)

export default (store) => ({
  path : 'demo',
  indexRoute: {
    component: Test
  },

  getChildRoutes (partialNextState, cb) {
    require.ensure([], (require) => {
      cb(null, [
        require('./routes/ProductCreator').default,
        require('./routes/Counter')(store)
      ])
    })
  }
})
