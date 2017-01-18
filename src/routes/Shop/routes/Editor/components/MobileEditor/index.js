import React, { Component, PropTypes, ReactDOM } from 'react'
import { findDOMNode } from 'react-dom'

import Product from '../../containers/ProductContainer'
import Preview from '../../containers/PreviewContainer'
import EditorDragLayer from '../EditorDragLayer'
import Detail from '../../containers/DetailContainer'
import '../../../../../../styles/iconfont/iconfont.css'
import '../../../../../../styles/mobile/mbase.scss'
import './MobileEditor.scss'

import Slider from 'react-rangeslider';

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
  constructor(props, context) {
    super(props, context);
    this.state = {
      value: 100 /** Start value **/
    };
  }

  handleChange = (value) => {
    const scrollDom = findDOMNode(this.refs.scrollWrap)

    const dis = (scrollDom.scrollHeight - scrollDom.offsetHeight) * (100-value)/100;
    
    scrollDom.scrollTop = dis
    // console.log( findDOMNode(this.refs.scrollWrap) );
    
    this.setState({
      value: value
    });
  }

  render() {
    const {value} = this.state;

    return <div className="clx">
      <LeftSideBar/>
      <div className="editor-content">
        <div className="preview">
          <div className="bg-phone">
            <div className="mobile-header">
              <img className="clock" src="http://p1.bpimg.com/1949/b03fdb9b6fa122d0.png" />
            </div>
            <div className="scroll-wrap" ref="scrollWrap">
              <Preview/>
            </div>
            <div className="slider-wrap">
              <Slider value={value} orientation="vertical" onChange={this.handleChange} />
              { /* <div>Value: {value}</div> */ }
            </div>
            { /* <span className="slide-text">滑动此区域以展示更多</span> */ }
          </div>
        </div>
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
