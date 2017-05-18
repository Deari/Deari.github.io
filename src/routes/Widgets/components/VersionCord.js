import React, { Component, PropTypes } from 'react'
import DescribeIcon from 'components/DescribeIcon'

class VersionCordModule extends Component {
  state={
    errTxt:'',
    isErr:0
  }
  compareVersion (versionArr, lastCodeVersionArr) {
    const a1 = parseInt(versionArr[0])
    const b1 = parseInt(lastCodeVersionArr[0])
    const a2 = parseInt(versionArr[1])
    const b2 = parseInt(lastCodeVersionArr[1])
    const a3 = parseInt(versionArr[2])
    const b3 = parseInt(lastCodeVersionArr[2])

    if (a1 > b1) {
      return true
    } else if (a1 === b1) {
      if (a2 > b2) {
        return true
      } else if (a2 === b2) {
        if (a3 > b3) {
          return true
        }
      }
    }
    return false
  }

  handleBlur (e) {
    this.setState({ isErr:0, errTxt:'' })
    const codeVersion = this.props.codeVersion
    const versionArr = e.target.value.split('.')
    const a1 = parseInt(versionArr[0])
    const a2 = parseInt(versionArr[1])
    const a3 = parseInt(versionArr[2])
    if (a1 === 0 && a2 === 0 && a3 === 0) {
      this.setState({ isErr: 1, errTxt: '您输入的版本格式有误' })
      this.props.toggleCodeVersion(-1)
      return
    }
    if (!e.target.value) {
      this.setState({ isErr: 1, errTxt: '请输入版本号' })
      this.props.toggleCodeVersion(-1)
      return
    }
    if (!/^(?:0|[1-9]\d*)\.(?:0|[1-9]\d*)\.(?:0|[1-9]\d*)$/.test(e.target.value)) {
      this.setState({ isErr: 1, errTxt: '您输入的版本格式有误' })
      this.props.toggleCodeVersion(-1)
      return
    }
    if (codeVersion) {
      const lastCodeVersionArr = codeVersion.split('.')
      if (!this.compareVersion(versionArr, lastCodeVersionArr)) {
        this.setState({ isErr: 1, errTxt: '您输入的版本不可小于老版本' })
        this.props.toggleCodeVersion(-1)
        return
      }
    }
    this.props.toggleCodeVersion(e.target.value)
  }
  render () {
    const { errTxt, isErr } = this.state
    let describeContent = `您要填入的 App 版本号。编号应遵循软件版本规范。比如：1.0.0，即为大版本，代表核心框架调整。1.1.0，即为小版本，代表核心功能调整。1.1.1，即为子版本，代表优化或修复bug。`
    return (
      <div className='form-row version-module-container'>
        <label><i className='require_field'>*</i>版本号</label>
        <div className='row-right'>
          <span className='message-info message-info-gray'>
            {this.props.codeVersion && `您的线上版本为：${this.props.codeVersion}。`}您要填入的版本号。编号应遵循软件版本规范。
          </span>
          <input placeholder='请输入版本号' className="use-input" type='text' onBlur={this.handleBlur.bind(this)} className='use-input' />
          {isErr ? <span className='message-info'>{errTxt}</span> : ''}
        </div>
        <DescribeIcon describeId='codeVersion' describeContent={describeContent} />
      </div>
    )
  }
}
export default VersionCordModule
