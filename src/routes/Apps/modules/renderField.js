import React, { Component, PropTypes } from 'react'
import fetchUtil from 'utils/fetchUtil'
import { getDomain, getDownloadDomain } from 'utils/d'
import debug from 'utils/debug'
import classnames from 'classnames'
import { updateSecondForm } from '../routes/Editor/modules/edit'
import DescribeIcon from 'components/DescribeIcon'

export const renderField = ({ required, maxLength,  input, label, placeholder, type, describeId, describeContent, meta: { touched, dirty, error, warning } }) => (
  <div className='form-row'>
    <label> { required ? <i className='require_field'>*</i> : '' }
      {label} <i className='iconfont icon-edit diff' /></label>
    <div className='row-right'>
      <input {...input} maxLength={maxLength} placeholder={placeholder || label} type={type}/>
      {(dirty || touched) && ((error && <span>{error}</span>))}
    </div>
    <DescribeIcon describeId={describeId} describeContent={describeContent} />
  </div>
)

export const renderTextArea = ({ required, input, label, placeholder, type, describeId, describeContent, meta: { touched, dirty, error, warning } }) => (
  <div className='form-row'>
    <label>{required ? <i className='require_field'>*</i> : ''}{label}</label>
    <div className='row-right'>
      <textarea {...input} placeholder={placeholder || label} className='use-textarea' />
      {(dirty || touched) && ((error && <span>{error}</span>))}
    </div>
    <DescribeIcon describeId={describeId} describeContent={describeContent} />
  </div>
)

export const versionTextArea = ({ input, label, placeholder, type, meta: { touched, dirty, error, warning } }) => (
  <div className='form-row'>
    <label>{label}</label>
    <div className='row-right'>
      <p><i className='iconfont icon-miashu' />描述此版本的新增内容，例如增添了何种新功能，有何改进之处以及修正了哪些错误。</p>
      <textarea {...input} placeholder={placeholder || label} />
      {(dirty || touched) && ((error && <span>{error}</span>))}
    </div>
  </div>
)
export const renderSelect = ({ input, label, meta: { touched, dirty, error, warning }, children }) => (
  <div className='form-row'>
    <label>{label}</label>
    <div className='row-right'>
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
    const newTags = input.value.filter(v => v != tagId)
    if (newTags.length == input.value.length) {
      newTags.push(tagId)
    }

    input.onChange(newTags)
  }

  render () {
    const { required, input, tags, label, describeId, describeContent, meta: { touched, dirty, error, warning } } = this.props

    return (
      <div className='form-row describe-tags'>
        <label>{required ? <i className='require_field'>*</i> : ''}{label}</label>
        <div className='row-right max-width'>
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
          {(dirty || touched) && ((error && <span className='label-message'>{error}</span>))}
        </div>
        <DescribeIcon describeId={describeId} describeContent={describeContent} />
      </div>
    )
  }

}

export class renderImageUpload extends Component {

  imageUpload (e) {
    if (!e.target.files[0]) return

    const url = getDomain('/app/v1/bo/v1/web/photo/upload')
    const formData = new FormData()
    formData.append('fileName', e.target.files[0])
    formData.append('width', 400)
    formData.append('height', 400)
    formData.append('fileType', JSON.stringify(['png']))
    formData.append('fileSize', 1024 * 300)

    fetchUtil.postJSON(url, formData, {
      jsonStringify: false
      // credentials: true
    }).then(res => {
      if (res.status == 200) {
        this.props.input.onChange(res.data.url)
      } else {
        debug.warn('上传图片不符合规格')
      }
    }).catch(e => {
      console.log('网络错误', e)
    })
  }

  render () {
    const { required, input, label, describeId, describeContent, meta: { touched, dirty, error, warning } } = this.props

    return (
      <div className='form-row'>
        <label> {required ? <i className='require_field'>*</i> : ''}{label}</label>
        <div className='row-right'>
          <p>请上传应用高清图片</p>
          <p>400*400像素，仅支持PNG格式，大小不超过300KB</p>
          <span>
            <input type='button' value='选择文件' />
            <input type='file' accept='.png' onChange={::this.imageUpload} />
          </span>
          <div className='img-container'>
            <img src={input.value} alt='上传图片' className='img-thumbnail' />
          </div>
          {(dirty || touched) && ((error && <span>{error}</span>))}
        </div>
        <div className='describe-padding'>
          <DescribeIcon describeId={describeId} describeContent={describeContent} />
        </div>
      </div>
    )
  }

}

export class renderAPKFile extends Component {
  state = {
    start: 0,
    end: 1 * 1024 * 1024,
    filecode: 0,
    shardSize: 1 * 1024 * 1024,
    txt: '',
    index: 0,
    pressNum: 0,
    resp: ''
  }
  fileUpload (e) {
    if (!e.target.files[0]) return
    const fileValue = e.target.files[0]
    // const name = file.name;
    const size = fileValue.size
    const shardSize = 1 * 1024 * 1024
    const pressNum = Math.ceil(size / shardSize)
    this.setState({ index: 0, filecode: 0, start: 0, end: shardSize, shardSize: shardSize, txt: '上传中...', pressNum: pressNum }, () => { this.upload(fileValue) })
  }

  upload (file) {
    const { start, end, shardSize, filecode, index, pressNum } = this.state
    const xhr = new XMLHttpRequest()
    const fd = new FormData()
    const that = this
    const url = getDomain(`/app/v1/bo/sliceUpload`)
    const readyChange = (that) => {
      if (xhr.readyState == 4) {
        if (xhr.status >= 200 && xhr.status < 300) {
          if (JSON.parse(xhr.responseText).status == 500 || JSON.parse(xhr.responseText).status == 404) {
            const errMsg = debug.getErrStatus(JSON.parse(xhr.responseText).status)
            debug.warn(errMsg)
            return
          } else {
            const changeEnd = end + shardSize > file.size ? file.size : end + shardSize
            const res = JSON.parse(xhr.responseText).data
            if (index === pressNum) {
              const fileObj = {
                url: getDownloadDomain(`/v2/file/${this.state.filecode}`),
                name: file.name,
                size: file.size
              }
              console.log(fileObj)
              this.props.input.onChange(fileObj)
              return
            }
            const newIndex = index + 1
            that.setState({ start: end, end: changeEnd, filecode: res.fileCode, index: newIndex })
            that.upload(file)
          }
        }
      }
    }
    if (index + 1 === 1) {
      fd.append('totalblocks', pressNum)
      fd.append('filesize', file.size)
      fd.append('clientType', 1)
      fd.append('file', file.slice(start, end))
      fd.append('blocksort', index + 1)
    } else {
      fd.append('clientType', 1)
      fd.append('file', file.slice(start, end))
      fd.append('blocksort', index + 1)
      fd.append('filecode', filecode)
    }

    xhr.open('POST', url, true)

    xhr.onreadystatechange = function () {
      readyChange(that)
    }
    xhr.send(fd)
  }
  getArr (pressNum) {
    if (pressNum <= 0) return
    const newArr = []
    for (let i = 1; i <= pressNum; i++) {
      newArr.push(i)
    }
    return (newArr)
  }
  render () {
    const { required, input, tags, label, meta: { touched, dirty, error, warning } } = this.props
    const { pressNum, index } = this.state
    const stokeStyle = {
      width: Math.round((1 / pressNum) * 420) + 'px'
    }
    const fillStyle = {
      width: Math.round((1 / pressNum) * 420) - 2 + 'px'
    }
    const pressArr = this.getArr(pressNum)
    return (
      <div className='form-row'>
        <label>{ required ? <i className='require_field'>*</i> : '' }{label}</label>
        <div className='row-right'>
          <span className='right-upload'>
            <input type='button' value='选择文件' />
            <input type='file' accept='.apk' onChange={this.fileUpload.bind(this)} />
            {index && pressNum && index < pressNum ? this.state.txt : input.value.name}
            <span className='progress-box'>
              {
                Array.isArray(pressArr) && pressArr.map((item, key) => {
                  return (
                    <b key={key} className='progress-stoke' style={stokeStyle}><i className={item <= index ? 'progressed-fill' : 'progress-fill'} style={fillStyle} /></b>
                  )
                })
              }
              {index && pressNum ? <b className='progress-num'>{index}MB/共{pressNum}MB</b> : ''}

            </span>
          </span>
          {(dirty || touched) && ((error && <span>{error}</span>))}
        </div>
      </div>
    )
  }

}

export class renderFile extends Component {

  fileUpload (e) {
    if (!e.target.files[0]) return

    const url = getDomain('/app/v1/bo/v1/web/file/upload')
    const formData = new FormData()

    formData.append('fileName', e.target.files[ 0 ])

    fetchUtil.postJSON(url, formData, {
      jsonStringify: false
      // credentials: true
    }).then(res => {
      if (res.status === 200) {
        this.props.input.onChange(res.data)
      } else {
        const errMsg = debug.getErrStatus(res.status)
        debug.warn(errMsg)
      }
    }).catch(e => {
      console.log('网络错误', e)
    })
  }

  render () {
    const { required, isMiniProgram, input, tags, label, genre, meta: { touched, dirty, error, warning }, describeId, describeContent } = this.props

    return (
      <div className='form-row'>
        <label className='label-type'>{ required ? <i className='require_field'>*</i> : '' }{label}<span>{genre}</span></label>
        <div className='row-right'>
          { isMiniProgram ? <div className='mini-program-xx'>
            应用类型为“FAP小程序”，请您先试用打包工具(
              <a style={{color: '#2692fb', textDecoration: 'underline'}} href='http://fdfs.ffan.net/v2/file/nDjvYxof9gD9AjbH9o4al93o5T2mw9Yp?attachExt=2'>Windows</a> 
              | <a  style={{color: '#2692fb', textDecoration: 'underline'}} href='http://fdfs.ffan.net/v2/file/BgbBeXayRXw6H5h4aF3115Egr50dM6pr?attachExt=2'>Mac</a>
              )进行打包，请将打包完成后的应用进行上传。
          </div> : null }
          <span className='right-upload'>
            <input type='button' value='选择文件' />
            <input type='file' accept='.fap' onChange={::this.fileUpload} />
            {input.value.originalName}
          </span>
          {(dirty || touched) && ((error && <span>{error}</span>))}
        </div>
      </div>
    )
  }
}

export const renderPublishRadioBox = ({ required, input, label, publishList, meta: { touched, dirty, error, warning } }) => <div className='form-row'>
  <label>{ required ? <i className='require_field'>*</i> : '' }{label}</label>
  <div className='row-right max-width'>
    <p>
      在您的应用获得批准后，我们可以立即为您发布它。如果您要自己发布该应用。请选择一个日期或者在批准后的任何时刻手动发布它。
      当您的应用处于“等待开发人员发布”状态。您可以继续测试，或者拒绝发布并提交一个新的版本。无论您选择哪个选项，我们必须先
      处理您的应用，然后才能在应用市场上提供它。当您的应用处于“审核中”状态，您无法拒绝您的应用。
    </p>
    {
      publishList.map(item => <div className='row-sizeB'>
        <span onClick={e => { input.onChange(item.value) }}>
          <div className='row-radio'>
            <input type='radio' name='radio' checked={input.value == item.value} />
            <span>
              <i className='iconfont icon-radio1 icon-radio1V' />
              <i className='iconfont icon-radio icon-radioV' />
            </span>
          </div>
          <span>{item.txt}</span>
        </span>
      </div>
    )}
    <span className='clearF' />
    {(dirty || touched) && ((error && <span className='errorM'>{error}</span>))}
  </div>
</div>

export const renderCodeVersion = ({ input, label, versionsList, meta: { touched, dirty, error, warning } }) => <div className='form-row'>
  <label>{label}</label>
  <div className='row-right max-width'>
    {
      versionsList.map(item => <div className='row-sizeB version'>
        <span onClick={e => { input.onChange(item.value) }}>
          <div className='row-radio'>
            <input type='radio' name='version' checked={input.value == item.value} />
            <span>
              <i className='iconfont icon-radio1 icon-radio1V' />
              <i className='iconfont icon-radio icon-radioV' />
            </span>
          </div>
          <span>{item.txt}</span>
        </span>
      </div>
    )}
    <p>版本号为： {input.value}</p>
    <span className='clearF' />
    {(dirty || touched) && ((error && <span className='errorM'>{error}</span>))}
  </div>
</div>

export default renderField
