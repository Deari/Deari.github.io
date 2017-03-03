import React, { Component, PropTypes } from 'react'
import DragProduct from './DragProduct'
import './Product.scss';
import Slider from 'react-rangeslider';
import { findDOMNode } from 'react-dom'

export class ProductContainer extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      value: 0 /** Start value **/
    };
  }

  handleChange = (value) => {
    const scrollDom = findDOMNode(this.refs.scrollWrap)
    const dis = (scrollDom.scrollHeight - scrollDom.clientHeight) * value/100;
    if(dis >= 0) {
      scrollDom.scrollTop = dis;
      this.setState({
        value: value
      });
    }
  }

  componentDidMount() {
    setTimeout(this.props.fetchProducts, 1000)
  }

  render() {
    const { products = [] } = this.props.product
    return (
      <div className="gui-wrap">
        <div className="gui-container" ref="scrollWrap">
          <h3 className="gui-title">通用大模块</h3>
          <ul className="gui-list">
            {products
              .filter(e=> e.defaultLayout.w !== 1)
              .map((p, i) => <li className="items" key={i}>
              <DragProduct {...p}/>
            </li>)}
          </ul>
          <h3 className="gui-title">功能小模块</h3>
          <ul className="gui-list">
            {products
              .filter(e=> e.defaultLayout.w === 1)
              .map((p, i) => <li className="items" key={i}>
              <DragProduct {...p}/>
            </li>)}
          </ul>
        </div>
        <div className="slider-wrap">
          <Slider value={this.state.value} orientation="vertical" reverse={true}
            tooltip={false} onChange={this.handleChange} />
        </div>
      </div>
      
    )
  }
}

ProductContainer.defaultProps = {
  product: {
    products: []
  }
}

ProductContainer.propTypes = {
  product: PropTypes.object.isRequired,
}

export default ProductContainer
