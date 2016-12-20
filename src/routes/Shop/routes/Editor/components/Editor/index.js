import React, { Component, PropTypes } from 'react'
import Product from '../../containers/ProductContainer'
import Preview from '../../containers/PreviewContainer'
import './Editor.scss'
import '../../../../../../styles/_base.scss'


export class Editor extends Component {

  componentDidMount() {
    this.props.fetchProducts()
  }

  render() {
    const { product } = this.props


    return <div className="bg-gray">
            <div className="myshop-content">
              <div className="cContent clx">
                <div id="editor-main clx">
                  <div className="col-sm-2 col-md-2 navThird">
                    <ul className="sub-nav">
                      <li className="navThirdHover">我的店铺组件</li>
                    </ul>
                    <div className="sub-content clx">
                      <Product {...product}/>
                    </div>
                    <div className="sub-banner"></div>
                    <div className="sub-banner"></div>
                    <p className="sub-info">鼠标按住上方店铺组件，拖动到右侧手机屏幕中进行编辑</p>
                    <a className="btn-more">更多店铺组件</a>
                  </div>
                  <div className="col-sm-8 col-md-8">
                    <div className="bg-white">
                      <div className="editor-view">
                        <Preview/>
                        <button onClick={::this.props.fetchProducts}>fetch</button>
                      </div>
                    </div>
                  </div>
                   <div className="col-sm-2 col-md-2 bg-white">
                      <div className="editor-right">
                        right
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
