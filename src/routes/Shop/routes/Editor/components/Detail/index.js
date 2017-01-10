import React, { Component } from 'react'
import Business from '../../../../../../components/business'


export const Detail = props => {

  const { detail, saveDetail, savePage, deleteElement, cancelElement } = props
  const { element } = detail

  if (!element.id) {
    return <div id="detail-container">
      <div className="share">
        <div className="bg-qr">
          <i className="iconfont icon-leftjiao"></i>
          <div className="qr"></div>
        </div>
        <p className="text">用微信<i className="iconfont icon-wechat"></i>扫描即可查看手机橱窗</p>
      </div>
      <div className="btn-block">
        {/*<button className="btn btn-white" onClick=""><i className="iconfont icon-update"></i>发布</button>*/}
        <button className="btn btn-blue" onClick={savePage}><i className="iconfont icon-save"></i>发布</button>
      </div>
    </div>
  }


  if (element.moduleType === 'html5') {
    const { Detail } = Business[ element.moduleName ]
    if (Detail) {
      // 自定义组件
      return <div id="detail-container">
        <Detail {...detail} onChange={saveDetail}/>
        <div className="btn-block">
          <button className="btn btn-blue" onClick={savePage}>
            <i className="iconfont icon-save"></i>发布
          </button>
        </div>
      </div>
    } else {
      // H5 中非自定义组件？
    }
  } else {
    // 普通组件
    return <div>
      <div className="btn-block">
        <button className="btn btn-blue" onClick={deleteElement}>删除</button>
        <button className="btn btn-blue" onClick={cancelElement}>取消</button>
      </div>
      {/*<pre>*/}
        {/*{JSON.stringify(element, null, 2)}*/}
      {/*</pre>*/}
    </div>
  }

}

Detail.defaultProps = {
  detail: {
    element: {}
  }
}

export default Detail
