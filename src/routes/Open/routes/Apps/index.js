import React from 'react'
import { IndexLink, Link } from 'react-router'
import './index.scss'
import Category from '../../../../components/category'
import fetchUtil from '../../../utils/fetchUtil'
import  Slidebar from '../../../../components/Sidebar'

class Container extends React.Component {
  constructor() {
    super();
    this.state = {
      category: [],
      "apps": []
    }
  }
  getCategory() {
    const apiUrl = `http://api.intra.sit.ffan.net/bo/v1/public/app/categories`;
    return fetchUtil.getJSON(apiUrl);
  }
  getList(categoryId) {
    var categoryId = categoryId || 'all';
    const apiUrl = `http://api.intra.sit.ffan.net/bo/v1/web/market/category/${categoryId}/apps`;
    return fetchUtil.getJSON(apiUrl);
  }
  async componentDidMount() {
    try {
      let result = await Promise.all([this.getCategory(), this.getList()]);
      result[0].data.list.unshift({
        categoryId: 'all',
        categoryName: '全部分类'
      })
      this.setState({
        category: result[0].data.list,
        apps: result[1].data.list,
      })
    } catch (e) {
      console.log("e ", e);
    }
  }
  async changeSelect(categoryId) {
    try {
      const res = await this.getList(categoryId);
      if (res.status === 200) {
        res.data && this.setState({apps: res.data.list ? res.data.list : ''});
      } else {
        window.alert(res.msg);
      }
    } catch (e) {
      console.log(e);
    }

  }
  render () {
    return (
      <div className="core-layout__viewport bg-gray">
        <div className="container clx">
          {/*<div className="sub-nav">*/}
            <Slidebar />
            {/*<ul>
              <li className="">
                全部分类
                <ul>
                {
                  this.state.category.map((item, index) => {
                    return <li className={item.checked ? 'navThirdHover' : ''}
                               onClick={this.selectCategory.bind(this, item)}
                               key={item.categoryId}>{item.categoryName}</li>
                  })
                }
                </ul>
              </li>
            </ul>
          </div>*/}
          <div className="sub-container">
            <div className="sub-container-banner"></div>
            <h2 className="open-content-nav">
              <i className="iconfont icon-hot-control"></i>热门控件
              <form>
                <p>
                  <select className="form-control">
                    <option>默认排序</option>
                    <option>默认1排序</option>
                    <option>默认2排序</option>
                  </select>
                </p>
                <p>
                  <select className="form-control">
                    <option>价格排序</option>
                    <option>价格1排序</option>
                    <option>价格2排序</option>
                  </select>
                </p>
              </form>
            </h2>
            <ul className="open-content-list">
            {
              this.state.apps.map((item, index) => {
                return (
                  <li>
                    <div>
                      <p className="open-list-start">
                        <i className="iconfont icon-star icon-start-hover"></i>
                        <i className="iconfont icon-uncollected"></i>
                      </p>
                      <Link to={'/open/apps/detail/' + item.appId}>
                      <p className="pt10">{item.appName}</p>
                      <span className="font-hidden font-nowrap"><i className="user-img"></i>极速数据(北京)</span>
                      <img className="" src={item.appLogo} alt="LOGO"/>
                      {/*<span>{item.appType}</span>*/}
                      <span className="font-hidden">全国30多个省市县的邮编号码查询，数据权威准确，数百万条数据，精确到区、县。支持按模糊地址、指定区域地址查询邮编。88888、县。支持按模糊地址、指定区域地址查询邮编。</span>
                    </Link>
                    <Link className="open-list-price">免费</Link>
                    <p>
                      <a><i className="iconfont icon-team"></i>165</a>
                      <a><i className="iconfont icon-star"></i>251</a>
                      <a><i className="iconfont icon-toparrow"></i>100%</a>
                    </p>
                    </div>
                  </li>
                )
              })
            }
            </ul>
          </div>
        </div>
      </div>
    )
  }
}

module.exports =  {
  path: 'apps',
  indexRoute: {
    component: Container
  },
  getChildRoutes(partialNextState, cb) {
    require.ensure([], (require) => {
      cb(null, [
        require('./Detail'),
      ])
    })
  }
}
