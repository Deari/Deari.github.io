import React from 'react'
import { findDOMNode } from 'react-dom'
import t from './img-new.scss'
import cx from 'classnames'
import { uploadImage } from 'reducers/api'
import Tips from '../Tips'

class ImageUploader extends React.Component {
  constructor(props) {
    super(props)
    this.state={
      value:  props.input.value
    }
  }

  upload (e) {
    if(!e.target.files.length) {
      return
    }
    // return console.log(e.target.files)
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
        value: data.url
      })
      this.props.input.onChange(data.url)
    }).catch(e => {
      console.log('上传失败', e)
    })
  }
  componentWillReceiveProps(newProps) {
    this.setState({ value: newProps.input.value })
  }
  selectFile () {
    findDOMNode(this.refs.file).click()
  }

  render () {
    const props = this.props;
    const { description, meta: { touched, dirty, error, warning } } = props;

    return (
      <div className="form-group">
        <label className="label">{props.label}</label>
        <div className='form-item'>
          <div className={"item-wrapper"}>
            <div className={t['item-rule']}>
              <span className={t['rule-text']}>请上传应用高清图片<br/>400*400像素，仅支持PNG格式，大小不超过300KB</span>
              { description && <Tips content={description}></Tips> }
            </div>
            <span className={t['upload-btn']}>
              <input type='file' ref="file" className={t['upload-file']} 
                accept='.png' onChange={::this.upload} />
              <div className={t.text} onClick={::this.selectFile}>选择文件</div>
            </span>
          </div>

          {(dirty || touched) && ((error && <div className="form-item-msg error">{error}</div>))}
          { this.state.value && <ul className={`${t['img-item']} ${t.active}`}>
            <li className={t['upload-img']}>
              <img src={this.state.value}/>
            </li>
          </ul> }
        </div>
      </div>
    )
  }
}

export default ImageUploader;