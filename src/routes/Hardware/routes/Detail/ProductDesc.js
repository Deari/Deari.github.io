import React from 'react'
const ProductDescTpl = (props) => (
  <div className="detail-table-content">
    <h5 className="detail-title">基本信息</h5>
    <ul className="detail-info">
      <li>
        <p>
          <span className="w62">发布时间:</span>
          <span className="w200">{props.data.createTime}</span>
        </p>
        <p>
          <span className="w62">通讯方式:</span>
          <span className="w200">{props.data.connectType}</span>
        </p>
      </li>
      <li>
        <p>
          <span className="w62">硬件品牌:</span>
          <span className="w200">{props.data.hardwareProducer}</span>
        </p>
        <p>
          <span className="w62">硬件型号:</span>
          <span className="w200">{props.data.model}</span>
        </p>
      </li>
    </ul>
    <p className="detail-info-text1">功能描述:</p>
    <p className="detail-info-text2">{props.data.remark}</p>
    <div className="line"></div>
    <h5 className="detail-title">商品介绍</h5>
    <img className="detail-introduce-img" src={props.data.uploadProductIntroduction} />
    <h5 className="detail-title">商品使用说明</h5>
    <img className="detail-introduce-img" src={props.data.uploadProductDescription} />
  </div>
)
export default ProductDescTpl  