import React from 'react'
import './index.scss'

class Versions extends React.Component {
  render() {

    const data = this.props.data || []
    const { onChange, showAll } = this.props

    return (
      <div>
        <h3 className="app-title">历史版本</h3>
        <table className="detail-table">
        {
          data.map((item, index) => (
            <div>
              <tr>
                <td className="title">更新日期</td>
                <td className="text">{ item.codeUpdateTime }</td>
              </tr>
              <tr>
                <td className="title">版本</td>
                <td className="text">{ item.codeVersion }</td>
              </tr>
              <tr>
                <td className="title">大小</td>
                <td className="text">{ item.fileSize }</td>
              </tr>
              <tr>
                <td className="title">版本介绍</td>
                <td className="text">{ item.codeDesc }</td>
              </tr>
              <tr>
                <td></td>
                <td></td>
              </tr>
              {item.codeId}
            </div>
          ))
        }
        </table>
        <a className="read-more" onClick={() => {onChange()}}>{showAll ? '收起' : '...更多版本介绍'}</a>
      </div>
    )
  }
}

export default Versions