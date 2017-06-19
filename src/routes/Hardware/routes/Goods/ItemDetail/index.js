/**
 * Created by lizhuo on 2017/6/14.
 */
import React from 'react';
import s from './index-new.scss'

const ItemDetail = (props) => {

  const {onCloseModal, data} = props
  return (
    <div className={`${s.container}`}>
      <h1 className={`${s.title}`}>
        商品管理
      </h1>
      <div className={`${s.body}`}>
        <div className={`${s.left}`}>
          <div className={`${s.img}`}>
            <img src={data.pic} alt="" className={`${s.pic}`}/>
            <label className={`${s.upload}`}>
              <input type="file"/>
            </label>
          </div>
          <p className={`${s.tip}`}>
            {'支持jpg/jpge/png格式，大小<2M'}
          </p>
          <p className={`${s['text-1']}`}>
            <span className={`${s.label}`}>原价：</span>
            <input type="text" placeholder={data.price}/>
          </p>
          <p className={`${s['text-1']}`}>
            <span className={`${s.label}`}>现价：</span>
            <input type="text" placeholder={data.price}/>
          </p>
          <p className={`${s['text-1']}`}>
            <span className={`${s.label}`}>库存：</span>
            <input type="text" placeholder={data.stock}/>
          </p>
        </div>
        <div className={`${s.right}`}>
          <p className={`${s['text-1']}`}>
            <span className={`${s.label}`}>品牌：</span>
            <input type="text"/>
          </p>
          <p className={`${s['text-1']}`}>
            <span className={`${s.label}`}>名称：</span>
            <input type="text" placeholder={data.name}/>
          </p>
          <p className={`${s['text-2']}`}>
            <span className={`${s.label}`}>分类：</span>
            <select name="" id="">
              <option value="">1</option>
              <option value="">2</option>
              <option value="">3</option>
            </select>
            <select name="" id="">
              <option value="">1</option>
              <option value="">2</option>
              <option value="">3</option>
            </select>
          </p>
          <p className={`${s['text-1']}`}>
            <span className={`${s.label}`}>型号：</span>
            <input type="text" placeholder={data.number}/>
          </p>
          <p className={`${s['textarea-1']}`}>
            <span className={`${s.label}`}>产品简介：</span>
            <textarea name="" id="" placeholder={data.introduce}/>
          </p>
          <p className={`${s['text-1']}`}>
            <span className={`${s.label}`}>购买上限：</span>
            <input type="text"/>
          </p>
          <p className={`${s['text-2']}`}>
            <span className={`${s.label}`}>状态：</span>
            <select name="" id="">
              <option value="0">上架</option>
              <option value="2">待上架</option>
              <option value="1">下架</option>
            </select>
          </p>
        </div>
      </div>
      <div className={`${s.footer}`}>
        <button className={`${s.cancel}`} onClick={onCloseModal}>取消</button>
        <button className={`${s.sure}`}>确定</button>
      </div>
    </div>
  )
}

export default ItemDetail
