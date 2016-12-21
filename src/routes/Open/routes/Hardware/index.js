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
      "hardware": [
        { 
          "hardwareId": 111,
          "hardwareType": 10,
          "hardwareName": "hardware1",
          "hardwareLogo": " ",
        },
        { 
          "hardwareId": 222,
          "hardwareType": 11,
          "hardwareName": "hardware2",
          "hardwareLogo": " ",
        },
        { 
          "hardwareId": 333,
          "hardwareType": 12,
          "hardwareName": "hardware3",
          "hardwareLogo": " ",
        },
        { 
          "hardwareId": 444,
          "hardwareType": 13,
          "hardwareName": "hardware4",
          "hardwareLogo": " ",
        },
        { 
          "hardwareId": 555,
          "hardwareType": 14,
          "hardwareName": "hardware5",
          "hardwareLogo": " ",
        },
        { 
          "hardwareId": 666,
          "hardwareType": 15,
          "hardwareName": "hardware6",
          "hardwareLogo": " ",
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
                this.state.hardware.map((item, index) => {
                  return (
                    <li>
                      <Link to={'/open/hardware/detail/' + item.hardwareId}>
                        <img src={item.hardwareLogo} alt="LOGO"/>
                        <span>{item.hardwareName}</span>
                        <span>{item.hardwareType}</span>
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
  path: 'hardware',
  // component: Container,
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
