import React from 'react'
import s from './index-new.scss'
import cx from 'classnames'

const PhoneSize = () => {
    return (
      <div className="form-group">
        <label className='label'>尺寸</label>
        <div className='form-item'>
          <div className="item-wrapper">
            <h3 className={s.title}>请选择要适配的屏幕尺寸</h3>
            <ul className={s.list}>
              <li className={s.item}>
                <label htmlFor="one" className={`${s.img} ${s['img-one']}`}></label>
                <span className={s['size-text']}>4*2</span>
                <div className={`row-radio ${s.radioBtn}`}>
                  <input type="checkbox"  id="one" className={`input-radio`}/>
                  <span className="radio-item">
                    <i className="iconfont icon-radio"></i>
                    <i className="iconfont icon-radio1"></i>
                  </span>
                </div>
              </li>
              <li className={s.item}>
                <label htmlFor="two" className={`${s.img} ${s['img-two']}`}></label>
                <span className={s['size-text']}>1*1</span>
                <div className={`row-radio ${s.radioBtn}`}>
                  <input type="checkbox"  id="two" className={`input-radio`}/>
                  <span className="radio-item">
                    <i className="iconfont icon-radio"></i>
                    <i className="iconfont icon-radio1"></i>
                  </span>
                </div>
              </li>
              <li className={s.item}>
                <label htmlFor="three" className={`${s.img} ${s['img-three']}`}></label>
                <span className={s['size-text']}>4*4</span>
                <div className={`row-radio ${s.radioBtn}`}>
                  <input type="checkbox" id="three" className={`input-radio`}/>
                  <span className="radio-item">
                    <i className="iconfont icon-radio"></i>
                    <i className="iconfont icon-radio1"></i>
                  </span>
                </div>
              </li>
              <li className={s.item}>
                <label htmlFor="four" className={`${s.img} ${s['img-four']}`}></label>
                <span className={s['size-text']}>4*1</span>
                <div className={`row-radio ${s.radioBtn}`}>
                  <input type="checkbox" id="four" className={`input-radio`}/>
                  <span className="radio-item">
                    <i className="iconfont icon-radio"></i>
                    <i className="iconfont icon-radio1"></i>
                  </span>
                </div>
              </li>
            </ul>
          </div>
          <div className="form-item-msg error">错误</div>
        </div>
      </div>
    )
}

export default PhoneSize;