import React from 'react'
import { Link } from 'react-router'

export const Versions = (props) => {
  const { onChangeShowAll, showAll, showSize } = props
  const versions = props.versions || []
  const len = versions && versions.length

  return len > 0 && <div className='table-info'>
    <h3 className='app-title'>历史版本</h3>
    <ul className='detail-tableList'>
      {
      versions.map((item, index) => (
        <li className='item'>
          <div className='cell'>
            <p className='title'>更新日期</p>
            <p className='text'>{ item.codeUpdateTime }</p>
          </div>
          <div className='cell'>
            <p className='title'>版本</p>
            <p className='text'>{ item.codeVersion }</p>
          </div>
          { showSize &&
            <div className='cell'>
              <p className='title'>大小</p>
              <p className='text'>{ item.bundleSize }</p>
            </div>
          }
          <div className='cell'>
            <p className='title'>版本介绍</p>
            <p className='text'>{ item.codeDesc }</p>
          </div>
        </li>
      ))
    }
    </ul>
    {(len > 0) && <a className='read-more' onClick={() => { onChangeShowAll() }}>{showAll ? '收起' : '...更多版本介绍'}</a>}
  </div>
}

export const Unapprove = (props) => {
  const { editUrl, data, latestVersion } = props
  return <div className='table-info'>
    <h3 className='app-title'>审核未通过原因:</h3>
    <p className='text-field'>{latestVersion.reviewReason ? latestVersion.reviewReason : '无返回信息'}</p>
    {/** <Link to={editUrl}><button className="btn btn-primary fieldBtn" type="button">编辑</button></Link> */}
  </div>
}

export const AdminUnshelved = (props) => {
  const { adminUnshelvedReason } = props.data && props.data || ''
  return <div className='table-info'>
    <h3 className='app-title'>下架原因:</h3>
    <p className='text-field'>{adminUnshelvedReason}</p>
    {/** <button className="btn btn-primary fieldBtn" type="button">联系管理员</button> */}
  </div>
}

export class SaleRange extends React.Component {

  state = {
    operation: ''
  }

  componentDidMount () {
    const { activeCodeStatus } = this.props || ''
    let operation = ''
    if (activeCodeStatus && activeCodeStatus === 5) {
      operation = 'shelve'
    } else if (activeCodeStatus && activeCodeStatus === 7) {
      operation = 'unshelve'
    }
    this.setState({ operation: operation })
  }

  changeRange (e) {
    this.setState({ operation: e.target.value })
  }

  save (e) {
    e.preventDefault()
    const { operation } = this.state
    const { onChangeRange } = this.props
    onChangeRange(operation)
  }

  render () {
    const { operation } = this.state

    return <div className='table-info'>
      <h3 className='app-title'>销售范围</h3>
      <form className='radio-from' onSubmit={this.save.bind(this)}>
        <label className='redio-item'>
          <input type='radio' name='aaa' value={'shelve'} checked={operation == 'shelve'}
            onChange={this.changeRange.bind(this)} /> 在所有地区供应
        </label>
        <label className='redio-item'>
          <input type='radio' name='aaa' value={'unshelve'} checked={operation == 'unshelve'}
            onChange={this.changeRange.bind(this)} /> 下架
        </label>
        <button className='btn-primary' type='submit'>保存</button>
      </form>
    </div>
  }
}
