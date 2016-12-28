import React from 'react'
import { IndexLink, Link } from 'react-router'
import './index.scss'

class OpenList extends React.Component {
  state = {
    listData: [],
    typeName: ''
  }
  componentWillReceiveProps( nextProps ) {
    if ( !nextProps.listData ) return
    const { listData, typeName } = nextProps
    this.setState({ listData: listData, typeName: typeName})
  }
  clickStar(item) {
    let { listData, typeName } = this.state
    for (let i=0; i<listData.length; i++) {
      if (listData[i][`${typeName}Id`] === item[`${typeName}Id`]) {
        if (listData[i].checkedStar) {
          listData[i].checkedStar = false;
          this.setState({listData: listData})
          return;
        } else {
          listData[i].checkedStar = true;
          this.setState({listData: listData})
          return
        }
      }
    }
  }
  getLinkUrl(item) {
    const { typeName } = this.state
    if (!item[`${typeName}Id`]) return `/open/${typeName}s`
    let link = ''
    if (item.appType === 2) {
      link = '/open/widgets/detail/' + item[`${typeName}Id`]
    } else {
      link = `/open/${typeName}s/detail/` + item[`${typeName}Id`]
    }
    return link
  }
  render() {
    const { listData, typeName } = this.state
    return (
      <ul className="open-content-list">
      {
        listData.length !== 0 ?
        listData.map(( item, index ) => {
          return (
            <li>
              <div>
                <p className="open-list-start" onClick={this.clickStar.bind(this, item)}>
                  <i className="iconfont icon-star icon-start-hover"></i>
                  { item.checkedStar ? '' : <i className="iconfont icon-uncollected"></i> }
                </p>
                <Link className="open-content-info" to={this.getLinkUrl.bind(this, item)}>
                  <p className="open-info-name">{ item[`${typeName}Name`] }</p>
                  <span className="open-user-name font-hidden font-nowrap"><i className="user-img"></i>极速数据(北京)</span>
                  <img className="" src={ item[`${typeName}Logo`] } alt="LOGO"/>
                  <span className="open-info-introduce font-hidden">{ item[`${typeName}Desc`] }</span>
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
        }) :
        <p>暂无数据</p>
      }
      </ul>
    )
  }
}

export default OpenList
