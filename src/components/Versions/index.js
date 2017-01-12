import React from 'react'

class Versions extends React.Component {
  render() {

    const { onChange, showAll, showSize } = this.props
    const data = this.props.data || []
    const len = data && data.length

    return (
      <div>
        <h3 className="app-title">历史版本</h3>
        <ul className="detail-tableList">
        {
          data.map((item, index) => (
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
        {(len > 0) && <a className="read-more" onClick={() => {onChange()}}>{showAll ? '收起' : '...更多版本介绍'}</a>}
      </div>
    )
  }
}

export default Versions