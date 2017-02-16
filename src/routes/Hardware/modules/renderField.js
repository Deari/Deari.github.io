import React, { Component, PropTypes } from 'react'
import fetchUtil from 'utils/fetchUtil'
import { getDomain } from 'utils/domain'
import debug from 'utils/debug'

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

/**
 * 关联下拉列表框
 */
export class renderCorDropdown extends Component {

  changeMajor = e => {
    const { input } = this.props
    const majorCategoryId = e.target.value
    const selectCate = this.props.cates.find(cate => cate.categoryId == majorCategoryId)

    if (selectCate) {
      input.onChange({
        majorCategoryId,
        minorCategories: selectCate.categoryChilds,
        minorCategoryId: -1,
      })
    } else {
      input.onChange({
        majorCategoryId: -1,
        minorCategories: [],
        minorCategoryId: -1,
      })
    }
  }

  changeMinor = e => {
    const { input } = this.props
    const minorCategoryId = e.target.value
    const { majorCategoryId, minorCategories } = input.value

    input.onChange({
      majorCategoryId,
      minorCategories,
      minorCategoryId,
    })

  }

  render() {
    const props = this.props
    const { minorCategories, majorCategoryId, minorCategoryId } = props.input.value
    const { meta: { touched, dirty, error, warning } } = this.props

    return <div className="form-row">
      <label>{props.label}</label>
      <div className="row-right">
        <select className="row-select" onChange={this.changeMajor} value={majorCategoryId}>
          <option value={-1}>请选择主分类</option>
          {props.cates.map(cate => <option key={cate.categoryId}
                                           value={cate.categoryId}>{cate.categoryName}</option>)}
        </select>
        <select className="row-select" onChange={this.changeMinor} value={minorCategoryId}>
          <option value={-1}>请选择子分类</option>
          {minorCategories.map(cate => <option key={cate.categoryId}
                                               value={cate.categoryId}>{cate.categoryName}</option>)}
        </select>
        {(dirty || touched) && ((error && <span>{error}</span>))}
      </div>
    </div>
  }
}

export class renderTags extends Component {

  handleClick(tagId) {
    const { input } = this.props
    const newTags = input.value.filter(v => v != tagId)
    if (newTags.length == input.value.length) {
      newTags.push(tagId)
    }

    input.onChange(newTags)
  }

  render() {
    const { input, tags, label, meta: { touched, dirty, error, warning } } = this.props

    return (
      <div className="form-row">
        <label>{label}</label>
        <div className="row-right max-width">
	        <ul>
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
          {(dirty || touched) && ((error && <span>{error}</span>))}
	      </div>
      </div>
    )
  }

}

export class renderImageUpload extends Component {

  imageUpload(e) {
    if (!e.target.files[0]) return;

    const url = getDomain("web/photo/upload")
    const formData = new FormData()
    formData.append('fileName', e.target.files[ 0 ])
    formData.append('width', 400)
    formData.append('height', 400)
    formData.append("fileType", JSON.stringify(['png']))
    formData.append("fileSize", 1024 * 300)

    fetchUtil.postJSON(url, formData, {
      jsonStringify: false
    }).then(res => {
      if (res.status == 200) {
        this.props.input.onChange(res.data.url)
      } else {
        debug.warn('上传图片不符合规格')
      }
    }).catch(e => {
      console.log('接口错误', e)
    })
  }

  render() {
    const { input, label, meta: { touched, dirty, error, warning } } = this.props

    return (
      <div className="form-row">
        <label>{label}</label>
        <div className="row-right">
          <p>请上传应用高清图片</p>
          <p>400*400像素，仅支持PNG格式，大小不超过300KB</p>
          <span>
            <input type="button" value="选择文件"/>
            <input type="file" accept=".png" onChange={::this.imageUpload}/>
          </span>
          <div className="img-container">
            <img src={input.value} alt="上传图片" className="img-thumbnail"/>
          </div>
          {(dirty || touched) && ((error && <span>{error}</span>))}
        </div>
      </div>
    )
  }

}

export class renderImgsUpload extends Component {

  state = {
    imgs: []
  }

  componentDidMount() {
    const { input } = this.props
    this.setState({ imgs: input.value })
  }

  imageUpload(e) {
    if (!e.target.files[0]) return;

    const { input } = this.props
    const { imgs } = this.state

    if (input.value.length >= 4) {
      window.alert("最多上传四张")
      return
    }

    let newArr = imgs
    const url = getDomain("web/photo/upload")
    const formData = new FormData()
    formData.append('fileName', e.target.files[ 0 ])
    formData.append('fileSize', 1024 * 1024)

    fetchUtil.postJSON(url, formData, {
      jsonStringify: false
    }).then(res => {
      if (res.status == 200) {
        newArr.push(res.data.url)
        this.setState({ imgs: newArr }, () => {
          input.onChange(newArr);
        })
      } else {
        debug.warn('上传图片不符合规格')
      }
    }).catch(e => {
      console.log('上传图片不符合规格', e)
    })
  }

  render() {
    const { input, label, meta: { touched, dirty, error, warning } } = this.props
    const { imgs } = this.state

    return (
      <div className="form-row">
        <label>{label}</label>
        <div className="row-right">
          <p>请上传硬件真实图片</p>
          <p>要求细节清晰，尺寸不限，最多上传4张，每张大小不超过1M。</p>
          <span>
            <input type="button" value="选择文件"/>
            <input type="file" accept="image/*" onChange={::this.imageUpload}/>
          </span>
          <div className="img-container">
            {
              imgs.map((item, index) => {
                return <img src={item} alt="上传图片" className="img-thumbnail"/>
              })
            }
          </div>
          {(dirty || touched) && ((error && <span>{error}</span>))}
        </div>
      </div>
    )
  }

}

export class renderFile extends Component {

  state = {
    originalName: ''
  }

  fileUpload(e) {
    if (!e.target.files[0]) return;
    
    const url = getDomain("web/file/upload")
    const formData = new FormData()

    formData.append('fileName', e.target.files[ 0 ])
    formData.append('fileType', 'all')
    formData.append('businessType', 'hardware')

    fetchUtil.postJSON(url, formData, {
      jsonStringify: false
    }).then(res => {
      if (res.status === 200) {
        this.props.input.onChange(res.data.url)
        this.setState({originalName: res.data.originalName})
      } else {
        debug.warn('文件代码包格式错误')
      }
    }).catch(e => {
      console.log('文件代码包格式错误', e)
    })
  }

  render() {
    const { input, tags, label, meta: { touched, dirty, error, warning } } = this.props
    const { originalName } = this.state

    return (
      <div className="form-row">
        <label>{label}</label>
        <div className="row-right">
          <span className="right-upload">
            <input type="button" value="选择文件" />
            <input type="file" onChange={::this.fileUpload} />
            {originalName}
          </span>
          {(dirty || touched) && ((error && <span>{error}</span>))}
        </div>
      </div>
    )
  }

}

export default renderField
