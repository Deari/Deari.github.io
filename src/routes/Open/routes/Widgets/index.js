import React from 'react'
import { IndexLink, Link } from 'react-router'

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
      "widgets": [
        { 
          "widgetId": 111,
          "widgetType": 10,
          "widgetName": "widget1",
          "widgetLogo": " ",
        },
        { 
          "widgetId": 222,
          "widgetType": 11,
          "widgetName": "widget2",
          "widgetLogo": " ",
        },
        { 
          "widgetId": 333,
          "widgetType": 12,
          "widgetName": "widget3",
          "widgetLogo": " ",
        },
        { 
          "widgetId": 444,
          "widgetType": 13,
          "widgetName": "widget4",
          "widgetLogo": " ",
        },
        { 
          "widgetId": 555,
          "widgetType": 14,
          "widgetName": "widget5",
          "widgetLogo": " ",
        },
        { 
          "widgetId": 666,
          "widgetType": 15,
          "widgetName": "widget6",
          "widgetLogo": " ",
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
    return (<div className="bg-gray pt10">
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
                this.state.widgets.map((item, index) => {
                  return (
                    <li>
                      <Link to={'/open/widgets/detail/' + item.widgetId}>
                        <img src={item.widgetLogo} alt="LOGO"/>
                        <span>{item.widgetName}</span>
                        <span>{item.widgetType}</span>
                      </Link>
                      <Link><button className="btn">下载</button></Link>
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
