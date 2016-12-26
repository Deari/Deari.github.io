import React, { Component, PropTypes } from 'react'
import Product from '../../containers/ProductContainer'
import Preview from '../../containers/PreviewContainer'
import EditorDragLayer from '../EditorDragLayer'

import './MobileEditor.scss'


export class Editor extends Component {

  componentDidMount() {
    this.props.fetchProducts()
  }

  render() {
    const { product } = this.props
    return <div id="mobile-editor-container">
      <div className="cContent">
        <div id="editor-main">
          <div className="navThird">
            <div className="nav-fixed">
              <ul className="sub-nav">
                <li className="navThirdHover">我的店铺组件</li>
              </ul>
              <div className="sub-nav-menu scrollbar">
                <div className="sub-content clx">
                  <Product {...product}/>
                </div>
                <div className="sub-banner"></div>
                <div className="sub-banner"></div>
                <p className="sub-info">鼠标按住上方店铺组件，拖动到右侧手机屏幕中进行编辑</p>
                <a className="btn-more">更多店铺组件</a>
              </div>
            </div>
          </div>
          <div className="editor-view">
            <div className="preview">
              <div className="bg-phone"></div>
              <Preview/>
            </div>
            {/*<button onClick={::this.props.fetchProducts}>fetch</button>*/}
          </div>
          {/*<div className="col-sm-2 col-md-2 bg-white">*/}
          {/*<div className="nav-fixed">*/}
          {/*<div className="editor-right sub-nav-menu">*/}
          {/*<Detail/>*/}
          {/*</div>*/}
          {/*</div>*/}
          {/*</div>*/}
        </div>
      </div>
      <EditorDragLayer/>
    </div>
  }
}

export default Editor


Editor.propTypes = {
  products: PropTypes.array
}
