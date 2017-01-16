import React, { Component, PropTypes } from 'react'
import Product from '../../containers/ProductContainer'
import Preview from '../../containers/PreviewContainer'
import EditorDragLayer from '../EditorDragLayer'
import Detail from '../../containers/DetailContainer'
import '../../../../../../styles/iconfont/iconfont.css'
import './MobileEditor.scss'

const LeftSideBar = props => (
  <div className='sidebar-left'>
    <ul className="nav">
      <li className="item">
        <span className="menu-title"><i className="iconfont icon-uncollected"></i>常用</span>
        <Product />
      </li>
      <li className="item"><span className="menu-title"><i className="iconfont icon-text"></i>图文类</span></li>
      <li className="item"><span className="menu-title"><i className="iconfont icon-sidebar6"></i>营销互动类</span></li>
      <li className="item"><span className="menu-title"><i className="iconfont icon-goods"></i>商品类</span></li>
    </ul>
   <a className="btn-more" href="wandaffoap://jump/componentMarket">
     <i className="iconfont icon-puzzle"></i>
     <span className="text">更多</span>
     <i className="iconfont icon-readMore"></i></a>
  </div>
)

export class Editor extends Component {

  render() {
    return <div className="clx">
      <LeftSideBar/>
      <div className="editor-content">
        <div className="preview">
          <div className="bg-phone">
            <div className="mobile-header">
              <img className="clock" src="http://img1.ffan.com/T1hOJTB_WT1RCvBVdK" />
              <div className="mobile-headerInfo">
                <i className="iconfont icon-leftarrow"></i>
                <h3 className="title">GAP(金地中心店)</h3>
                <i className="iconfont icon-search"></i>
              </div>
            </div>
            <div className="scroll-wrap">
              <Preview/>
            </div>
            <span className="slide-text">滑动此区域以展示更多</span>
          </div>
        </div>
        {/*<p className="text">市面最主流机型，iphone首屏位置</p>*/}
      </div>
      <div className="sidebar-right">
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
