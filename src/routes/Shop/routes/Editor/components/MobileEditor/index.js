import React, { Component, PropTypes } from 'react'
import Product from '../../containers/ProductContainer'
import Preview from '../../containers/PreviewContainer'
import EditorDragLayer from '../EditorDragLayer'
import Detail from '../../containers/DetailContainer'
import '../../../../../../styles/iconfont/iconfont.css'
import './MobileEditor.scss'


const rightSideBarStyle = {
  position: 'fixed',
  borderLeft: '10px solid #eee',
  width: 180,
  top: 0,
  bottom: 0,
  right: 0,
}

const LeftSideBar = props => (
  <div className='sidebar'>
    <h3 className="side-title"><i className="iconfont icon-arrR"></i>我的店铺组件</h3>
    <Product/>
    <div className="sub-banner-pd">
      <div className="sub-banner"></div>
      <div className="sub-banner"></div>
    </div>
    <p className="sub-info"><i className="icon-circle"></i>鼠标按住上方店铺组件，拖动到右侧手机屏幕中进行编辑</p>
    <a className="btn-more"><i className="iconfont icon-hot-control"></i>更多店铺组件</a>
  </div>
)

export class Editor extends Component {

  render() {
    return <div className="clx">
      <LeftSideBar/>
      <div className="editor-view">
        <div className="preview">
          <div className="bg-phone"></div>
          <Preview/>
        </div>
      </div>
      <div className="right-sidebar" style={rightSideBarStyle}>
        <Detail/>
      </div>
      <pre>
      </pre>
      <EditorDragLayer/>
    </div>
  }
}

export default Editor

Editor.propTypes = {
  products: PropTypes.array
}
