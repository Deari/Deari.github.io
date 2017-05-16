import React from 'react'
import s from '../Basic-new.scss'
import t from './img-new.scss'
import cx from 'classnames'

const ImageUploader = () => {
	return (
    <div className="form-group">
      <label className="label">应用图片</label>
      <div className='form-item'>
        <div className={cx("item-wrapper", s['item-upload'])}>
          <div className={t['item-rule']}>
            <span className={t['rule-text']}>请上传应用高清图片<br/>400*400像素，仅支持PNG格式，大小不超过300KB</span>
            <div className={s.helpMsg}>
              <i className="iconfont icon-miashu"></i>
              <p className={s.cont}>此图标将用于 应用市场，最低分辨率至少为 72 DPI，并采用 RGB 色彩空间。它不能包含图层或圆角。</p>
            </div>
          </div>
          <span className={t['upload-btn']}>
            <input type="file" className={t['upload-file']}/>
            <div className={t.text}>选择文件</div>
          </span>
        </div>

        <div className="form-item-msg error">请输入内容</div>

        <ul className={`${t['img-item']} ${s.active}`}>
          <li className={t['upload-img']}>
            <img src=""/>
          </li>
        </ul>
      </div>
    </div>
  )
}

export default ImageUploader;