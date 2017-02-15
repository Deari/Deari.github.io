import React from 'react'
import { Link } from 'react-router'

export const Versions = (props) => {
  const { onChangeShowAll, showAll, showSize } = props
  const versions = props.versions || []
  const len = versions && versions.length

  return len > 0 && <div className="table-info">
    <h3 className="app-title">历史版本</h3>
    <ul className="detail-tableList">
    {
      versions.map((item, index) => (
        <li className="item">
          <div className="cell">
            <p className="title">更新日期</p>
            <p className="text">{ item.codeUpdateTime }</p>
          </div>
          <div className="cell">
            <p className="title">版本</p>
            <p className="text">{ item.codeVersion }</p>
          </div>
          { showSize &&
            <div className="cell">
              <p className="title">大小</p>
              <p className="text">{ item.bundleSize }</p>
            </div>
          }
          <div className="cell">
            <p className="title">版本介绍</p>
            <p className="text">{ item.codeDesc }</p>
          </div>
        </li>
      ))
    }
    </ul>
    {(len > 0) && <a className="read-more" onClick={() => {onChangeShowAll()}}>{showAll ? '收起' : '...更多版本介绍'}</a>}
  </div>
}

export const Unapprove = (props) => {
  const { editUrl, data } = props
  return <div>
    <p>审核未通过原因:</p>
    <p></p>
    <Link to={editUrl}><button className="btn btn-primary" type="button">编辑</button></Link>
  </div>
}

export const AdminUnshelved = (props) => {
  const { adminUnshelvedReason } = props.data && props.data || ''
  return <div>
    <p>下架原因:</p>
    <p>{adminUnshelvedReason}</p>
    <button className="btn btn-primary" type="button">联系管理员</button>
  </div>
}

export class SaleRange extends React.Component {

  state = {
    unshelved: 1
  }

  componentDidMount() {
    const { published } = this.props || ''
    let unshelved = ''
    if (published && published === 5) {
      unshelved = 1
    } else if (published && published === 7) {
      unshelved = 0
    }
    this.setState({unshelved: unshelved})
  }

  changeRange(e) {
    this.setState({unshelved: e.target.value})
  }

  save(e) {
    e.preventDefault()
    const { unshelved } = this.state
    const { onChangeRange } = this.props
    onChangeRange(unshelved)
  }

  render() {

    const { unshelved } = this.state

    return <div>
      <p>销售范围</p>
      <form onSubmit={this.save.bind(this)}>
        <input type="radio" name="aaa" value={1} checked={unshelved == 1} 
               onChange={this.changeRange.bind(this)} /> 在所有地区供应
        <input type="radio" name="aaa" value={0} checked={unshelved == 0} 
               onChange={this.changeRange.bind(this)} /> 下架
        <button className="btn btn-primary" type="submit">保存</button>
      </form>
    </div>
  }
}