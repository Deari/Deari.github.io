import Pagination from './components/Pagination'
import s from './index-new.scss'

var showdown  = require('showdown'),
    converter = new showdown.Converter(),
    text      = `#hello, markdown!`;

function createMarkup() {
  return {__html: converter.makeHtml(text)};
}

const Test = () => (<div className={s.pageDemo}>
  <div dangerouslySetInnerHTML={createMarkup()} />
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
