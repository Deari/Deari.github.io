import React, { Component, PropTypes } from 'react'
import fetchUtil from '../../../../utils/fetchUtil'
import { getDomain } from '../../../../utils/domain'
import debug from '../../../../utils/debug'

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

export class renderSizeRadioBox extends Component {
  render(){
    const {input, sizeList} = this.props
    const width = input.value.w
    const height = input.value.h
    return(   
      <div className="form-row">
        <label>尺寸</label>
        <div className="row-right">
          <p>请选择组件在手机屏幕中所占比例的尺寸</p>
          {sizeList.map(item => <div className="row-size" onClick={e => { input.onChange(item.value) } }>
            <span className={`${item.image} row-img`}></span>
            <div className="row-radio">
              <input type="radio" name="radio" checked={item.value.w === width&&item.value.h ===height} />
              <span>
                <i className="iconfont icon-radio1"></i>
                <i className="iconfont icon-radio"></i>
              </span>
            </div>
          </div>)}
        </div>
      </div>
    )
  }

}

export class renderTags extends Component {

  handleClick(tagId) {
    const { input } = this.props;
    const newTags = input.value.filter(v => v != tagId);
    if (newTags.length == input.value.length) {
      newTags.push(tagId)
    }

    input.onChange(newTags);
  }

  render() {
    const { input, tags, label, meta: { touched, error, warning } } = this.props;

    return (
      <div className="form-row">
        <label>{label}</label>
        <ul className="row-right max-width">
          {
            tags.map((item) => (
              <li
                className={
                  ((tagId) => {
                    return input.value.indexOf(tagId) > -1 ? 'active' : ''
                  })(item.tagId)
                }
                key={item.tagId}
                onClick={() => this.handleClick(item.tagId)}
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
    const url = getDomain("http://api.intra.", "ffan.net/bo/v1/web/photo/upload")
    const formData = new FormData()
    formData.append('fileName', e.target.files[0])
    formData.append('width', 400)
    formData.append('height', this.props.h ? this.props.h : 400)
    formData.append("fileType", JSON.stringify(['png']))
    formData.append("fileSize", 1024 * 300)

    fetchUtil.postJSON(url, formData, {
      jsonStringify: false
    }).then(res => {
      if (res.status == 200) {
        this.props.input.onChange(res.data.url)
      } else {
        debug.warn('上传图片不符合规格', res)
      }
    }).catch(e => {
      console.log(e)
    })
  }

  render() {
    const { input, label, meta: { touched, error, warning }, doc, h} = this.props;
    return (
      <div className="form-row">
        <label>{label}</label>
        <div className="row-right">
          <p>{doc ? doc : '请上传组件高清图片'}</p>
          <p>400*{h ? h : 400}像素，仅支持PNG格式，大小不超过300KB</p>
          <span>
            <input type="button" value="选择文件" />
            <input type="file" accept="image/*" onChange={::this.imageUpload}/>
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

    formData.append('fileName', e.target.files[ 0 ])

    console.log(e.target.files[ 0 ].name);

    fetchUtil.postJSON(url, formData, {
      jsonStringify: false

    }).then(res => {
      console.info(res);

      if (res.status === 200) {

        this.props.input.onChange(res.data)

      } else {
        debug.warn('文件代码包格式错误', res)
      }    

    }).catch(e => {
      console.warn(e);
    })
  }

  render() {
    const { input, tags, label, meta: { touched, error, warning } } = this.props;

    return (

      <div className="form-row file-position">
        <label>{label}</label>
        <div className="row-right">
          <input type="file" className="form-file" onChange={::this.fileUpload}/>
        </div>
      </div>
    )
  }

}

export default renderField;
