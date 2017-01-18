import React, { Component } from 'react'
import Business from '../../../../../../components/business'


export class Detail extends Component {
  savePageHandler = () => {
    const { savePage, detail: { pagePublish } } = this.props
    if (pagePublish !== 'start') {
      savePage()
    }
  }

  render() {

    const { detail, saveDetail, deleteElement, cancelElement } = this.props
    const { element, pagePublish } = detail

    if (!element.id) {
      return <div id="detail-container">
        <div className="share">
          <div className="bg-qr">
            <i className="iconfont icon-leftjiao"></i>
            <div className="qr"></div>
          </div>
          <p className="text">用蓝海APP扫描即可查看手机橱窗</p>
        </div>
        <div className="btn-block">
          {/*<button className="btn btn-white" onClick=""><i className="iconfont icon-update"></i>发布</button>*/}
          <button className={ `m-btn m-btn-blue m-btn-block ${pagePublish === 'start' ? 'disabled' : ''}` }
                  onClick={::this.savePageHandler}><i className="iconfont icon-save"></i>
            {pagePublish === 'start' ? '发布中...' : '保存并发布'}
          </button>
        </div>
      </div>
    }


    if (element.moduleType === 'html5') {
      const { Detail } = Business[ element.moduleName ]
      if (Detail) {
        // 自定义组件
        return <div id="detail-container">
          <Detail {...detail} onChange={saveDetail}/>
        </div>
      } else {
        // H5 中非自定义组件？
      }
    } else {
      // 普通组件
      return <div className="widgets-btn-container">
        <div className="btn-block">
          <button className="m-btn m-btn-red" onClick={deleteElement.bind(null, element.id)}>删除组件</button>
          <button className="m-btn m-btn-border-green" onClick={cancelElement}>取消</button>
          {/*<button className="btn btn-white" onClick=""><i className="iconfont icon-update"></i>发布</button>*/}
          <button className={ `m-btn m-btn-blue m-btn-block ${pagePublish === 'start' ? 'disabled' : ''}` }
                  onClick={::this.savePageHandler}><i className="iconfont icon-save"></i>
            {pagePublish === 'start' ? '发布中...' : '保存并发布'}
          </button>
        </div>
      </div>
    }

  }
}

Detail.defaultProps = {
  detail: {
    element: {}
  }
}

export default Detail
