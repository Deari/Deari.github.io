import React from 'react'
import { IndexLink, Link } from 'react-router'
import Category from '../../../../components/category'
import fetchUtil from '../../../utils/fetchUtil'

class Container extends React.Component {
  constructor() {
    super();
    this.state = {
      category: [],
      "hardwares": []
    }
  }
  getCategory() {
    const apiUrl = `http://api.intra.sit.ffan.net/bo/v1/web/hardware/getCategory`;
    return fetchUtil.getJSON(apiUrl);
  }
  getList(categoryId) {
    var categoryId = categoryId || 'all';
    const apiUrl = `http://api.intra.sit.ffan.net//bo/v1/public/hardware/list${categoryId}`;
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
        hardware: result[1].data.list,
      })
    } catch (e) {
      console.log("e ", e);
    }
  }
  async changeSelect(categoryId) {
    try {
      const res = await this.getList(categoryId);
      if (res.status === 200) {
        res.data && this.setState({hardware: res.data.list ? res.data.list : ''});
      } else {
        window.alert(res.msg);
      }
    } catch (e) {
      console.log(e);
    }

  }
  render () {
    return (<div className="bg-gray pt10">
      <div className="nav-second container">
        <div className="cContent row">
          <div className="navThird col-md-2 col-sm-2">
            <Category data={this.state.category} onChangeSelect={this.changeSelect.bind(this)}/>
          </div>
          <div className="col-md-10 col-sm-10">
            <div className="ccContent">
              <ul>
              {
                this.state.hardwares.map((item, index) => {
                  return (
                    <li>
                      <Link to={'/open/hardware/detail/' + item.appId}>
                        <img src={item.appLogo} alt="LOGO"/>
                        <span>{item.appName}</span>
                        <span>{item.appType}</span>
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
