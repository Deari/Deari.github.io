import React from 'react'
import { findDOMNode } from 'react-dom'
import t from './img-new.scss'
import cx from 'classnames'
import { uploadFile } from 'reducers/api'
import Tips from '../Tips'
import { getDownloadDomain } from 'utils/d'

class fileSplitUploader extends React.Component {
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
  selectFile () {
    findDOMNode(this.refs.file).click()
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
            return console.log("error");
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
    const props = this.props;
    const { title, description, input, accept, meta: { touched, dirty, error, warning } } = props
    const { pressNum, index } = this.state
    const stokeStyle = {
      width: Math.round((1 / pressNum) * 420) + 'px'
    }
    const fillStyle = {
      width: Math.round((1 / pressNum) * 420) - 2 + 'px'
    }
    const pressArr = this.getArr(pressNum)
    return (
      <div className="form-group">
        <label className="label">{props.label}</label>
        <div className='form-item'>
          <div className={"item-wrapper"}>
            <div className={t['item-rule']}>
              { title }
              { description && <Tips content={description}></Tips> }
            </div>
            <span className={t['upload-btn']}>
              <input type='file' ref="file" accept={accept} hidden
                className={t['upload-file']} onChange={::this.upload} />
              <span className={t.btn} onClick={::this.selectFile}>选择文件</span>
              {/*<span className={t.exist}>{fileName || ''}</span>*/}
            </span>
            {index && pressNum && index < pressNum ? this.state.txt : input.value.name}
            <span className={t.progress}>
              {
                Array.isArray(pressArr) && pressArr.map((item, key) => {
                  return (
                    <b key={key} className={t.stoke} style={stokeStyle}>
                      <i className={item <= index ? t.filled : t.fill} style={fillStyle} />
                    </b>
                  )
                })
              }
              {index && pressNum ? <b className={t.num}>{index}MB/共{pressNum}MB</b> : ''}

            </span>
          </div>

          {(dirty || touched) && ((error && <div className="form-item-msg error">{error}</div>))}
        </div>
      </div>
    )
  }

}

export default fileSplitUploader