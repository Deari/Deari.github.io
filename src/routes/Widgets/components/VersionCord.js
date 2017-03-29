import React, { Component, PropTypes } from 'react'
import './versionCord.scss'
import { validate } from '../modules/validate'
class VersionCordModule extends Component {
  state={
    errTxt:'',
    isErr:0,
  }
  compareVersion(versionArr, lastCodeVersionArr) {
    const a1 = parseInt(versionArr[0]);
    const b1 = parseInt(lastCodeVersionArr[0]);
    const a2 = parseInt(versionArr[1]);
    const b2 = parseInt(lastCodeVersionArr[1]);
    const a3 = parseInt(versionArr[2]);
    const b3 = parseInt(lastCodeVersionArr[2]);
    if(a1>b1){
      return false
    } else {
      if(a2>b2){
        return false
      }else{
        if(a3>b3){
          return false
        }
      }
    }
    return true
	}
  handleBlur(e){
    this.setState({isErr:0,errTxt:''})
    const codeVersion = this.props.codeVersion
    if(!e.target.value){
      this.setState({isErr:1,errTxt:'请输入版本号'})
      return
    }
    if(!/^(?:0|[1-9]\d*)\.(?:0|[1-9]\d*)\.(?:0|[1-9]\d*)$/.test(e.target.value)){
      this.setState({isErr:1,errTxt:'您输入的版本格式有误'})
      return
    }
    if(codeVersion){
      const versionArr = e.target.value.split(".");
		  const lastCodeVersionArr = codeVersion.split(".");
      if(this.compareVersion(versionArr, lastCodeVersionArr)){
        this.setState({isErr:1,errTxt:'您输入的版本不可小于老版本'})
        return
      }
    }
    this.props.toggleCodeVersion(e.target.value)
  }
  render(){
    const {errTxt,isErr} = this.state
    return(
      <div>
          <label>版本号</label>
          <input placeholder='请输入版本号' type='text' onBlur={this.handleBlur.bind(this)}/>
          {isErr?<span>{errTxt}</span>:''}
      </div>
    )
  }
}
export default VersionCordModule