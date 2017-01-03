import React from 'react'
import fetchUtil from '../../../utils/fetchUtil'
import { getDomain } from '../../../utils/domain'
import Sidebar from '../../../../components/Sidebar'
import OpenList from '../../../../components/OpenList'

class Container extends React.Component {
  constructor() {
    super();
    this.state = {
      "apps": []
    }
  }
  async getList(tagId) {
    let id = tagId || 'all';
    let apiUrl = getDomain(
      `http://api.intra.`, 
      `ffan.net/bo/v1/web/market/tag/${id}/widgets`
    ) 
    try {
      let res = await fetchUtil.getJSON(apiUrl)
      if (res.status === 200) {
        res.data && this.setState({ apps: res.data.list })
      } else {
        res.msg && window.alert(res.msg)
      }
    } catch (e) {
      console.log("e ", e);
    }
  }
  componentDidMount() {
    this.getList()
  }
  tagChange(tagId) {
    this.getList(tagId)
  }
  render () {
    const { apps } = this.state
    return (
      <div className="core-layout__viewport bg-gray">
        <div className="container clx">
          <Sidebar onTagChange={this.tagChange.bind(this)} />
          <div className="sub-container">
            <div className="sub-container-banner"></div>
            <h2 className="open-content-nav">
              <i className="iconfont icon-hot-control"></i>热门控件
              <form>
                <p>
                  <select>
                    <option>默认排序</option>
                    <option>默认1排序</option>
                    <option>默认2排序</option>
                  </select>
                </p>
                <p>
                  <select>
                    <option>价格排序</option>
                    <option>价格1排序</option>
                    <option>价格2排序</option>
                  </select>
                </p>
              </form>
            </h2>
            <OpenList listData={apps} typeName="app" />
          </div>
        </div>
      </div>
    )
  }
}

module.exports =  {
  path: 'widgets',
  indexRoute: {
    component: Container,
  },
  getChildRoutes(partialNextState, cb) {
    require.ensure([], (require) => {
      cb(null, [
        require('./Detail'),
      ])
    })
  }
}
