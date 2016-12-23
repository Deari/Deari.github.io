import React from 'react'
import { IndexLink, Link } from 'react-router'
import Category from '../../../../components/category'
import fetchUtil from '../../../utils/fetchUtil'
import './index.scss'

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
          <div className="sub-nav">
            <ul>
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
          </div>
          <div className="sub-container">
            <div className="sub-container-banner"></div>
            <h2>
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
            <ul>
            {
              this.state.apps.map((item, index) => {
                return (
                  <li>
                    <Link to={'/open/apps/detail/' + item.appId}>
                      <p>{item.appName}</p>
                      <span>极速数据(北京)</span>
                      <img className="" src={item.appLogo} alt="LOGO"/>
                      {/*<span>{item.appType}</span>*/}
                      <span>全国30多个省市县的邮编号码查询，数据权威准确，数百万条数据，精确到区、县。支持按模糊地址、指定区域地址查询邮编。</span>
                    </Link>
                    <p><Link>免费</Link></p>
                    <p>
                      <span class="hot_control_li_money">￥20<i>元</i></span>
                      <span class="hot_control_li_bottom"><i class="iconfont icon-team"></i>165</span>
                      <span class="hot_control_li_bottom"><i class="iconfont icon-star"></i>251</span>
                      <span class="hot_control_li_bottom"><i class="iconfont icon-arrU"></i>100%</span>
                    </p>
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
