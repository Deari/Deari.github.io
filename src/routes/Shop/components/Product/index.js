import React, { Component } from 'react'

//class Product extends Component {
//
//  render() {
//    return <div>
//      <img src="https://dummyimage.com/450x150/d3d3d3/000" alt=""/>
//    </div>
//  }
//}

// TODO: 不同大小的图片信息

const Product = ({ name, imgSrc, width = 1, height = 1 }) => (
  <div>
    <img src={imgSrc || 'http://placeholder.qiniudn.com/150x100/4CD964/fff' } alt={name}/>
    <span>{name}-{width}x{height}</span>
  </div>
)


export default Product
