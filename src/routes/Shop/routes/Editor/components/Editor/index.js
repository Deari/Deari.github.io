import React, { Component, PropTypes } from 'react'
import Product from '../../containers/ProductContainer'
import Preview from '../../containers/PreviewContainer'
import Detail from '../../containers/DetailContainer'

import './Editor.scss'

export class Editor extends Component {

  componentDidMount() {
    this.props.fetchProducts()
  }

  render() {
    const { product } = this.props
    return <div className="bg-gray height-100" id="editor-container">
            <div className="height-100">
              <div className="cContent height-100 clx">
                <div id="editor-main clx" className="height-100">
                  <div className="col-sm-2 col-md-2 navThird">
                    <div className="nav-fixed">
                      <ul className="sub-nav">
                        <li className="navThirdHover">我的店铺组件</li>
                      </ul>
                      <div className="sub-nav-menu">
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
                  <div className="col-sm-8 col-md-8 height-100">
                    <div className="bg-white height-100">
                      <div className="editor-view">
                        <Preview/>
                        <button onClick={::this.props.fetchProducts}>fetch</button>
                      </div>
                    </div>
                  </div>
                   <div className="col-sm-2 col-md-2 bg-white">
                      <div className="nav-fixed">
                        <div className="editor-right sub-nav-menu">
                          <Detail/>
                        </div>
                      </div>
                  </div>
                </div>
              </div>
            </div>
        </div>
  }
}

export default Editor


Editor.propTypes = {
  products: PropTypes.array
}
