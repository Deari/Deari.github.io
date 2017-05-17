import React from 'react'
import { findDOMNode } from 'react-dom'
import s from '../Basic-new.scss'
import t from './img-new.scss'
import cx from 'classnames'
import { uploadImage } from 'reducers/api'

class ImageUploader extends React.Component {
  constructor(props) {
    super(props)
    const {value} = props.input
    this.state={
      fileList:  value ? (Array.isArray(value) ? value : [value]) : []
    }
  }

  upload (e) {
    if(!e.target.files.length) {
      return
    }
    const conf = {
      fileName: e.target.files[0],
      width: 400,
      height: 400,
      fileType: JSON.stringify(['png']),
      fileSize: 1024 * 300
    }
    const formData = new FormData()
    for(let k in conf ) {
      formData.append(k, conf[k])
    }
    uploadImage(formData).then(data=>{
      this.setState({
        fileList: this.state.fileList.concat([ data.url])
      })
      this.props.input.onChange(data.url)
    }).catch(e => {
      console.log('上传失败', e)
    })
  }

  selectFile () {
    findDOMNode(this.refs.file).click()
  }

  render () {
    const props = this.props;
    console.log(props.input.value)
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
              <input type='file' ref="file" className={t['upload-file']} 
                accept='.png' onChange={::this.upload} />
              <div className={t.text} onClick={::this.selectFile}>选择文件</div>
            </span>
          </div>

          <div className="form-item-msg error">请输入内容</div>

          <ul className={`${t['img-item']} ${t.active}`}>
          <li className={t['upload-img']}>
                <img src="https://www.baidu.com/img/bd_logo1.png"/>
              </li>
            {this.state.fileList.map((item) => {
              return <li className={t['upload-img']}>
                <img src={item}/>
              </li>
            })}
          </ul>
        </div>
      </div>
    )
  }
}

export default ImageUploader;