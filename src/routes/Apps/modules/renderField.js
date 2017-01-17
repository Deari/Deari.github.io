import React, { Component, PropTypes } from 'react'
import fetchUtil from 'routes/utils/fetchUtil'
import { getDomain } from 'utils/domain'
import debug from 'routes/utils/debug'

export const renderField = ({ input, label, type, meta: { touched, dirty, error, warning } }) => (
  <div className="form-row">
    <label>{label} <i className="iconfont icon-edit"></i></label>
    <div className="row-right">
      <input {...input} placeholder={label} type={type}/>
      {(dirty || touched) && ((error && <span>{error}</span>))}
    </div>
  </div>
)

export const renderTextArea = ({ input, label, type, meta: { touched, dirty, error, warning } }) => (
  <div className="form-row">
    <label>{label}</label>
    <div className="row-right">
      <textarea {...input} placeholder={label}></textarea>
      {(dirty || touched) && ((error && <span>{error}</span>))}
    </div>
  </div>
)

export const renderSelect = ({ input, label, meta: { touched, dirty, error, warning }, children }) => (
  <div className="form-row">
    <label>{label}</label>
    <div className="row-right">
      <select {...input}>
        {children}
      </select>
      {(dirty || touched) && ((error && <span>{error}</span>))}
    </div>
  </div>
)

export class renderTags extends Component {
  
  handleClick (tagId) {
    const { input } = this.props
    const newTags = input.value.filter(v=>v != tagId)
    if(newTags.length ==input.value.length) {
      newTags.push(tagId)
    }

    input.onChange(newTags)
  }

  render() {
    const { input, tags, label, meta: { touched, dirty, error, warning }} = this.props

    return (
      <div className="form-row">
        <label>{label}</label>
        <div className="row-right max-width">
        	<ul>
	          {
	            tags.map((item) => (
	              <li 
	                className={
	                  ((tagId)=>{
	                    return input.value.indexOf(tagId) > -1 ? 'active' : ''
	                  })(item.tagId)
	                }
	                key={item.tagId}
	                onClick={()=>this.handleClick(item.tagId)}
	              >{item.tagName}</li>
	            ))
	          }
	        </ul>
          {(dirty || touched) && ((error && <span className="label-message">{error}</span>))}
        </div>
      </div>
    )
  }
  
}

export class renderImageUpload extends Component {

  imageUpload(e) {
    const url = getDomain("web/photo/upload")
    const formData = new FormData()
    formData.append('fileName', e.target.files[0])
    formData.append('width', 400)
    formData.append('height', 400)
    formData.append("fileType", JSON.stringify(['png']))
    formData.append("fileSize", 1024 * 300)

    fetchUtil.postJSON(url, formData, {
      jsonStringify: false 
    }).then(res=>{
      if (res.status == 200) {
        this.props.input.onChange(res.data.url)
      } else {
        debug.warn('上传图片不符合规格')
      }
    }).catch(e=>{
      debug.warn('网络错误')
    })
  }

  render() {
    const { input, label, meta: { touched, dirty, error, warning }} = this.props
    
    return (
      <div className="form-row">
        <label>{label}</label>
        <div className="row-right">
          <p>请上传应用高清图片</p>
          <p>400*400像素，仅支持PNG格式，大小不超过300KB</p>
          <span>
            <input type="button" value="选择文件" />
            <input type="file" accept=".png" onChange={::this.imageUpload} />
          </span>
          <div className="img-container">
            <img src={input.value} alt="上传图片" className="img-thumbnail" />
          </div>
          {(dirty || touched) && ((error && <span>{error}</span>))}
        </div>
      </div>
    )
  }
  
}

export class renderFile extends Component {

  fileUpload(e) {
    const url = getDomain("web/file/upload")
    const formData = new FormData()
    formData.append('fileName', e.target.files[0])

    fetchUtil.postJSON(url, formData, {
      jsonStringify: false
    }).then(res=>{
      if (res.status === 200) {
        this.props.input.onChange(res.data)
      } else {
        debug.warn('文件代码包格式错误')
      }
    }).catch(e=>{
      debug.warn('网络错误')
    })
  }

  render() {
    const { input, tags, label, meta: { touched, dirty, error, warning }} = this.props
    
    return (
      <div className="form-row">
        <label>{label}</label>
        <div className="row-right">
          <input type="file" accept=".zip" className="form-file" onChange={::this.fileUpload} />
          {(dirty || touched) && ((error && <span>{error}</span>))}
        </div>
      </div>
    )
  }
  
}

export default renderField