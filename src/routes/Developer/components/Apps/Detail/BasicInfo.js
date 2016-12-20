import React from 'react'
import './BasicInfo.scss'

class BasicInfo extends React.Component {
  render() {
    let data = this.props.data;
    return (
      <div>
      {
        data ? 
        <div>
          <img src={data.appThumb} alt="LOGO" />
          应用名称: {data.appName}
          分类：{data.appType}
          描述：{data.appDesc}
          标签：{data.appName}
        </div> :
        React.createElement("div", {className: ''}, "页面加载中...")
      }
      </div>
    )
  }
}

export default BasicInfo;