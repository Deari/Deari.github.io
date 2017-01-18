import React, { Component } from 'react'
import Business from '../../../../../../components/business'
import Modal from 'components/Modal'
import './Detail.scss'

export class Detail extends Component {

  savePageHandler = () => {
    const { savePage, detail: { pagePublish } } = this.props
    if (pagePublish !== 'start') {
      savePage()
    }
  }

  getWidgetContainer() {
    const { detail, saveDetail, deleteElement, cancelElement } = this.props
    const { element } = detail

    if (!element.id) {
      return <div className="share">
        <div className="bg-qr">
          <i className="iconfont icon-leftjiao"></i>
          <div className="qr"></div>
        </div>
        <p className="text">用蓝海APP扫描即可查看手机橱窗</p>
      </div>
    }

    if (element.moduleType === 'html5') {
      const { Detail } = Business[ element.moduleName ]
      if (Detail) {
        // 自定义组件
        return <Detail {...detail} onChange={saveDetail}/>
      } else {
        // H5 中非自定义组件？
      }
    }

    return <div className="widgets-btn-container">
      <button className="m-btn m-btn-red" onClick={deleteElement.bind(null, element.id)}>删除组件</button>
      <button className="m-btn m-btn-border-green" onClick={cancelElement}>取消</button>
    </div>
  }

  state = {
    modalActive: true
  }

  onClose() {
    this.setState({
      modalActive: false
    })
  }

  onOpen() {
    this.setState({
      modalActive: true
    })
  }

  render() {
    const { detail } = this.props
    const { pagePublish } = detail
    return <div id="detail-container">
      <Modal type={"alert"}
             active={pagePublish === 'start'}
             onClose={::this.onClose}
             onCancel={::this.onClose}
             modalCls="preview-modal"
             hideButtons="true">
        <p className="center">发布中，请稍候</p>
      </Modal>

      {::this.getWidgetContainer()}
      <div className="btn-block">
        <button className={ `m-btn m-btn-blue m-btn-block ${pagePublish === 'start' ? 'disabled' : ''}` }
                onClick={::this.savePageHandler}><i className="iconfont icon-save"></i>
          {pagePublish === 'start' ? '发布中...' : '保存并发布'}
        </button>
      </div>
    </div>
  }
}

Detail.defaultProps = {
  detail: {
    element: {}
  }
}

export default Detail
