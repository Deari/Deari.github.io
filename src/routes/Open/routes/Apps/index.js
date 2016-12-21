import React from 'react'
import { IndexLink, Link } from 'react-router'
import fetchUtil from '../../../utils/fetchUtil'

class Container extends React.Component {
  constructor() {
    super();
    this.state = {
      category: [],
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
  getCategory() {
    const apiUrl = `http://api.intra.sit.ffan.net/bo/v1/public/app/categories`;
    return fetchUtil.getJSON(apiUrl);
  }
  getList(categoryId) {
    var categoryId = categoryId || '10';
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
      <div className="bg-gray pt10">
        <div className="nav-second container">
          <div className="cContent row">
            <div className="navThird col-md-2 col-sm-2">
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
