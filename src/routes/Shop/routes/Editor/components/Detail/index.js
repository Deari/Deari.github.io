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
    const { detail, saveDetail, deleteElement, cancelElement, editElement } = this.props
    const { element } = detail || {};
    const { codeSetting } = element;

    if (!element.id) {
      return <div>
        <h3 className="sidebar-right-title">扫描预览</h3>
        <div className="share">  
            <div className="qr"></div>
        </div>
         <p className="text" style={{'text-align': 'center'}}>用蓝海APP扫描<br/>即可预览店铺装修效果</p>
      </div>
    }

<div id="detail-container">
  <h3 class="sidebar-right-title">扫描预览</h3>
  <div class="share">
    <div class="qr"></div>
  </div>
  <p class="qr-text">用蓝海APP扫描即可预览装修效果</p>
  <div class="btn-block">
    <button class="m-btn m-btn-blue m-btn-block ">
    <i class="iconfont icon-save"></i>保存并发布</button>
  </div>
</div>
    if (element.moduleType === 'html5') {
      const { Detail } = Business[ element.moduleName ]
      if (Detail) {
        // 自定义组件
        return <Detail {...detail} onChange={saveDetail}/>
      } else {
        // H5 中非自定义组件？
      }
    }

    const allowEditItemList = ['input'];

    return <div>
      {Array.isArray(codeSetting) && codeSetting.length > 0 ?
        <div className="editor-container">
         <h3 className="sidebar-right-title">门店信息</h3>
        {
          codeSetting.map(({ label, type, enableEdit, value ,desc}) => enableEdit && 
          allowEditItemList.findIndex(item=>item === type) > -1 ? 
          <div key={label} className="item">
            <label htmlFor="" className="label">{label}</label>
            <input type="text" className="input" value={value} onChange={(e)=>editElement(element.id, label, e.target.value)}/>
            <span className='desc'>{desc}</span>
          </div> : null)
        }
        </div> : null
      }
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

  onToggle() {
    this.setState({
      modalActive: !this.state.modalActive
    })
  }

  render() {
    const { detail,deleteElement,cancelElement} = this.props
    const { pagePublish } = detail
console.log(this.props.detail.element)
    return <div id="detail-container">
      <Modal type={"alert"}
             active={pagePublish === 'start'}
             onClose={::this.onClose}
             onCancel={::this.onClose}
             modalCls="preview-modal"
             hideButtons={true}>
        <p className="center">发布中，请稍候 </p>
        <div className="center ball-beat"><div></div><div></div><div></div></div>
      </Modal>

      {::this.getWidgetContainer()}
      <div className="btn-block">
      {
        this.props.detail.element.appId ? 
        <div className="widgets-btn-container">
          <button className="m-btn m-btn-red">删除组件</button>
          <button className="m-btn m-btn-border-green" onClick={cancelElement}>取消</button>
        </div>
        :
        <button className={ `m-btn m-btn-blue m-btn-block ${pagePublish === 'start' ? 'disabled' : ''}` }
                onClick={::this.savePageHandler}><i className="iconfont icon-save"></i>
          {pagePublish === 'start' ? '发布中...' : '保存并发布'}
        </button>
      }
        
       
   
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
