import React from 'react'
import { findDOMNode } from 'react-dom'
import t from './img-new.scss'
import cx from 'classnames'
import { uploadFile } from 'reducers/api'
import Tips from '../Tips'

class FileUploader extends React.Component {
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
    const conf = {
      fileName: e.target.files[0],
    }
    const formData = new FormData()
    for(let k in conf ) {
      formData.append(k, conf[k])
    }
    uploadFile(formData).then(data=>{
      console.log("upload:", data)
      this.setState({
        value: data.url
      })
      const { url, originalName, rest } = data;
      this.props.input.onChange({
        ...rest,
        fileLink: url,
        fileName: originalName
      })
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
    const { required, title, accept, description, meta: { touched, dirty, error, warning } } = props;
    const { fileLink, fileName } = this.state.value;

    return (
      <div className="form-group">
        <label className={ cx("label", { "required": required })}>{props.label}</label>
        <div className='form-item'>
          <div className={"item-wrapper"}>
            <div className={t['item-rule']}>
              { title }
              { description && <Tips content={description}></Tips> }
            </div>
            <span className={t.uploader}>
              <input type='file' ref="file" accept={accept} hidden onChange={::this.upload} />
              <span className={t.btn} onClick={::this.selectFile}>选择文件</span>
              <span className={t.exist}>{fileName || ''}</span>
            </span>
          </div>

          {(dirty || touched) && ((error && <div className="form-item-msg error">{error}</div>))}
        </div>
      </div>
    )
  }
}

export default FileUploader;