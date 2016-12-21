import React from 'react'
import { IndexLink, Link } from 'react-router'
import fetchUtil from '../../../utils/fetchUtil'
import './index.scss'

class Container extends React.Component {
  constructor() {
    super();
    this.state = {
      isAll: true,
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
      this.setState({
        category: result[0].data.list,
        apps: result[1].data.list,
      })
    } catch (e) {
      console.log("e ", e);
    }
  }
  async selectCategory(item, e) {
    e.stopPropagation();
    if (item.checked) return;
    var category = this.state.category;
    for (var i=0; i<category.length; i++) {
      if (category[i].categoryId === item.categoryId) {
        category[i].checked = true;
      } else {
        category[i].checked = false;
      }
    }
    try {
      const result = await this.getList(item.categoryId);
      if (result.status === 200 && result.data) {
        this.setState({
          category: category,
          apps: result.data.list,
          isAll: false
        });
      }
    } catch (e) {
      console.log("e ", e);
    }
  }
  async selectAll(e) {
    if (this.state.isAll) return;
    var category = this.state.category;
    for (var i=0; i<category.length; i++) {
      category[i].checked = false;
    }
    try {
      const result = await this.getList();
      if (result.status === 200 && result.data) {
        this.setState({
          category: category,
          apps: result.data.list,
          isAll: true
        });
      }
    } catch (e) {
      console.log("e ", e);
    }
  }
  render () {
    console.log("isAll ", this.state.isAll)
    return (
      <div className="bg-gray pt10">
        <div className="nav-second container">
          <div className="cContent row">
            <div className="navThird col-md-2 col-sm-2">
              <ul>
                <li className={this.state.isAll ? 'navThirdHover' : ''} onClick={this.selectAll.bind(this)}>
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
            <div className="col-md-10 col-sm-10">
              <div className="ccContent">
                <ul>
                {
                  this.state.apps.map((item, index) => {
                    return (
                      <li className="col-md-3 ">
                        <Link to={'/open/apps/detail/' + item.appId}>
                          <img className="" src={item.appLogo} alt="LOGO"/>
                          <p>{item.appName}</p>
                          <span>{item.appType}</span>
                        </Link>
                        <Link><button className="btn">下载dfd</button></Link>
                      </li>
                    )
                  })
                }
                </ul>
              </div>
            </div>
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
