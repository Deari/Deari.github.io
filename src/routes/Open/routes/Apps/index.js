import React from 'react'
import { IndexLink, Link } from 'react-router'
import './index.scss'

class Container extends React.Component {
  constructor() {
    super();
    this.state = {
      category: [
        {categoryId: 1, categoryName: '分类一'},
        {categoryId: 2, categoryName: '分类二'},
        {categoryId: 3, categoryName: '分类三'},
        {categoryId: 4, categoryName: '分类四'},
        {categoryId: 5, categoryName: '分类五'},
      ],
      "apps": [
        { 
          "appId": 111,
          "appType": 10,
          "appName": "app1",
          "appLogo": " ",
        },
        { 
          "appId": 222,
          "appType": 11,
          "appName": "app2",
          "appLogo": " ",
        },
        { 
          "appId": 333,
          "appType": 12,
          "appName": "app3",
          "appLogo": " ",
        },
        { 
          "appId": 444,
          "appType": 13,
          "appName": "app4",
          "appLogo": " ",
        },
        { 
          "appId": 555,
          "appType": 14,
          "appName": "app5",
          "appLogo": " ",
        },
        { 
          "appId": 666,
          "appType": 15,
          "appName": "app6",
          "appLogo": " ",
        },
      ]
    }
  }
  selectCategory(item) {
    var category = this.state.category;
    for (var i=0; i<category.length; i++) {
      if (category[i].categoryId === item.categoryId) {
        category[i].checked = true;
      } else {
        category[i].checked = false;
      }
    }
    this.setState({category: category});
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
