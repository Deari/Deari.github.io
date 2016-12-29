import React, { Component, PropTypes } from 'react'
import fetchUtil from '../../../../utils/fetchUtil'
import { getDomain } from '../../../../utils/domain'

export const renderField = ({ input, label, type, meta: { touched, error, warning } }) => (
  <div className="form-row">
    <label>{label} <i className="iconfont icon-edit"></i></label>
    <div className="row-right">
      <input {...input} placeholder={label} type={type}/>
      {touched && ((error && <span>{error}</span>) || (warning && <span>{warning}</span>))}
    </div>
  </div>
)

export const renderTextArea = ({ input, label, type, meta: { touched, error, warning } }) => (
  <div className="form-row">
    <label>{label}</label>
    <div className="row-right">
      <textarea {...input} placeholder={label}></textarea>
      {touched && ((error && <span>{error}</span>) || (warning && <span>{warning}</span>))}
    </div>
  </div>
)

export const renderSelect = ({ input, label, meta: { touched, error, warning }, children }) => (
  <div className="form-row">
    <label>{label}</label>
    <div className="row-right">
      <select {...input}>
        {children}
      </select>
      {touched && ((error && <span>{error}</span>) || (warning && <span>{warning}</span>))}
    </div>
  </div>
)



export class renderTags extends Component {
  
  handleClick (tagId) {
    const { input } = this.props;
    const newTags = input.value.filter(v=>v != tagId);
    if(newTags.length ==input.value.length) {
      newTags.push(tagId)
    }

    input.onChange(newTags);
  }

  render() {
    const { input, tags, label, meta: { touched, error, warning }} = this.props;

    return (
      <div className="form-row">
        <label>{label}</label>
        <ul className="row-right max-width">
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
      </div>
    )
  }
  
}

export class renderImageUpload extends Component {

  imageUpload(e) {
    const url = getDomain("http://api.intra.","ffan.net/bo/v1/web/photo/upload")
    const formData = new FormData()
    formData.append('fileName', e.target.files[0])

    fetchUtil.postJSON(url, formData, {
      jsonStringify: false 
    }).then(res=>{
      if(res.status == 200) {
        this.props.input.onChange(res.data.url)
        console.log(`Upload Success: `)
      } else {
        console.log(`Upload Failed.`, res)
      }
    }).catch(e=>{
      console.log(e)
    })
  }

  render() {
    const { input, label, meta: { touched, error, warning }} = this.props;
    
    return (
      <div className="form-row">
        <label>{label}</label>
        <div className="row-right">
          <p>请上传应用高清图片</p>
          <p>400*400像素，仅支持PNG格式，大小不超过300KB</p>
          <span>
            <input type="button" value="选择文件" />
            <input type="file" accept="image/*" onChange={::this.imageUpload} />
          </span>
          <div className="img-container">
            <img src={input.value} alt="上传图片" className="img-thumbnail" />
          </div>
        </div>
      </div>
    )
  }
  
}

export class renderFile extends Component {

  fileUpload(e) {
    const url = getDomain("http://api.intra.", "ffan.net/bo/v1/web/file/upload")
    const formData = new FormData()

    formData.append('fileName', e.target.files[0])
    
    console.log(e.target.files[0].name);

    fetchUtil.postJSON(url, formData, {
      jsonStringify: false

    }).then(res=>{
      console.info(res);

      if(res.status === 200){
        
        this.props.input.onChange(res.data)

      } else{
        console.warn(res);
      }

    }).catch(e=>{
      console.warn(e);
    })
  }

  render() {
    const { input, tags, label, meta: { touched, error, warning }} = this.props;
    
    return (

      <div className="form-row file-position">
        <label>{label}</label>
        <div className="row-right">
          <input type="file" className="form-file" onChange={::this.fileUpload} />
        </div>
      </div>
    )
  }
  
}

export default renderField;