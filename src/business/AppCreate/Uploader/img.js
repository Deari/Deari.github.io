import React from 'react'
import { findDOMNode } from 'react-dom'
import s from './img-new.scss'
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
    const { limit={} } = this.props;
    const conf = {
      fileName: e.target.files[0],
      clientType: 1
    }
    Object.assign(conf, limit);
    
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
    const { required, description, example, title, meta: { touched, dirty, error, warning } } = props;

    return (
      <div className="form-group">
        <label className={ cx("label", { "required": required })}>{props.label}</label>
        <div className='form-item'>
          <div className={"item-wrapper"}>
            <div className={s['item-rule']}>
              { title }
              { description && <Tips content={description}></Tips> }
            </div>
            <span className={s.uploader}>
              <input type='file' ref="file" hidden 
                accept='.png' onChange={::this.upload} />
              <div className={s.btn} onClick={::this.selectFile}>选择文件</div>
            </span>
          </div>

          {(dirty || touched) && ((error && <div className="form-item-msg error">{error}</div>))}
          { this.state.value && <ul className={`${s['img-item']} ${s.active}`}>
            <li className={s['upload-img']}>
              <img src={this.state.value}/>
            </li>
          </ul> }
          { example }
        </div>
      </div>
    )
  }
}

export default ImageUploader;