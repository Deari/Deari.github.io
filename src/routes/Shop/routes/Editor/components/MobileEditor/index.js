import React, { Component, PropTypes, ReactDOM } from 'react'
import { findDOMNode } from 'react-dom'

import Product from '../../containers/ProductContainer'
import Preview from '../../containers/PreviewContainer'
import EditorDragLayer from '../EditorDragLayer'
import Detail from '../../containers/DetailContainer'
import '../../../../../../styles/mobile/mbase.scss'
import './MobileEditor.scss'

import { Accordion, Collapse } from 'components/Accordion'

import Slider from 'react-rangeslider';

const LeftSideBar = props => (
  <div className='sidebar-left'>
    <Accordion className="nav">
      <Collapse className="item">
        <div className="menu-title">
          <i className="iconfont icon-uncollected"></i>
          <span>常用</span>
        </div>
        <div className="menu-cont">
          <Product />
        </div>
      </Collapse>

      <Collapse className="item">
        <div className="menu-title">
          <i className="iconfont icon-text"></i>
          <span>图文类</span>
          <i className="fr-icon iconfont icon-menu-more"></i>
        </div>
        <div className="menu-cont" style={{height: 278}}>
          图文类
        </div>
      </Collapse>

      <Collapse className="item">
        <div className="menu-title">
          <i className="iconfont icon-gift"></i>
          <span>营销互动类</span>
          <i className="fr-icon iconfont icon-menu-more"></i>
        </div>
        <div className="menu-cont" style={{height: 278}}>
          营销互动类
        </div>
      </Collapse>

      <Collapse className="item">
        <div className="menu-title">
          <i className="iconfont icon-goods"></i>
          <span>商品类</span>
          <i className="fr-icon iconfont icon-menu-more"></i>
        </div>
        <div className="menu-cont" style={{height: 278}}>
          商品类
        </div>
      </Collapse>

    </Accordion>

    <a className="btn-more" href="wandaffoap://jump/componentMarket">
      <i className="iconfont icon-puzzle"></i>
      <span className="text">获取更多组件</span>
      <i className="iconfont icon-readMore"></i>
    </a>
  </div>
)

export class Editor extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      show: false,
      value: 100 /** Start value **/
    };
  }

  handleChange = (value) => {
    // if(!this.isMounted()) { return }
    const scrollDom = findDOMNode(this.refs.scrollWrap)
    if (!scrollDom) {
      return
    }
    const dis = (scrollDom.scrollHeight - scrollDom.clientHeight) * (100 - value) / 100;

    if (dis > 0 || scrollDom.scrollTop != dis) {
      scrollDom.scrollTop = dis;
      this.setState({
        value: value
      });
    } else if (scrollDom.scrollHeight - scrollDom.clientHeight <= 0) {
      scrollDom.scrollTop = 0;
      this.setState({
        value: 100
      });
    }
  }

  onLayoutChange = () => {
    const scrollDom = findDOMNode(this.refs.scrollWrap)
    if (!scrollDom) {
      return
    }
    setTimeout(() => {
      if (scrollDom) {
        const show = scrollDom.scrollHeight > scrollDom.clientHeight
        this.setState({
          show
        })
      }
    }, 500)
  }

  render() {
    const { value, show } = this.state;

    return <div className="clx">
      <LeftSideBar/>
      <div className="editor-content">
        <div className="preview">
          <div className="bg-phone">
            <div className="mobile-header">
              <img className="clock" src="http://timg.ffan.com/convert/resize/url_T1AOhTB7Wg1RCvBVdK/tfs/b03fdb9b6fa122d0.png"/>
            </div>
            <div className="scroll-wrap" ref="scrollWrap">
              <Preview onLayoutChange={this.onLayoutChange}/>
            </div>
            <div className="slider-wrap">
              { show ? <Slider value={value} orientation="vertical" onChange={this.handleChange}/> : ''}
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
