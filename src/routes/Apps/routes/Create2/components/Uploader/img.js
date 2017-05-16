import React from 'react'
import s from '../Basic-new.scss'
import t from './img-new.scss'
import cx from 'classnames'

const ImageUploader = (props) => {
	return (
    <div className="form-group">
      <label className="label">{props.label}</label>
      <div className='form-item'>
        <div className={"item-wrapper"}>
          <div className={t['item-rule']}>
            <span className={t['rule-text']}>请上传应用高清图片<br/>400*400像素，仅支持PNG格式，大小不超过300KB</span>
            <div className={s.helpMsg}>
              <i className="iconfont icon-miashu"></i>
              <p className={s.cont}>{props.description}</p>
            </div>
          </div>
          <span className={t['upload-btn']}>
            <input type="file" hidden className={t['upload-file']}/>
            <div className={t.text}>选择文件</div>
          </span>
        </div>

        <div className="form-item-msg error">请输入内容</div>

        <ul className={`${t['img-item']} ${t.active}`}>
          <li className={t['upload-img']}>
            <img src=""/>
          </li>
        </ul>
      </div>
    </div>
  )
}

export default ImageUploader;