import React, { Component, PropTypes } from 'react'
import fetchUtil from 'utils/fetchUtil'
import { getDomain, getUploaderDomain } from 'utils/domain'
import debug from 'utils/debug'
import classnames from 'classnames'
import { updateSecondForm } from '../routes/Editor/modules/edit'
export const renderField = ({ input, label, placeholder, type, meta: { touched, dirty, error, warning } }) => (
  <div className="form-row">
    <label>{label} <i className="iconfont icon-edit"></i></label>
    <div className="row-right">
      <input {...input} placeholder={placeholder || label} type={type}/>
      {(dirty || touched) && ((error && <span>{error}</span>))}
    </div>
  </div>
)

export const renderTextArea = ({ input, label, placeholder, type, meta: { touched, dirty, error, warning } }) => (
  <div className="form-row">
    <label>{label}</label>
    <div className="row-right">
      <textarea {...input} placeholder={placeholder || label}></textarea>
      {(dirty || touched) && ((error && <span>{error}</span>))}
    </div>
  </div>
)

export const versionTextArea = ({ input, label, placeholder, type, meta: { touched, dirty, error, warning } }) => (
  <div className="form-row">
    <label>{label}</label>
    <div className="row-right">
      <p><i className="iconfont icon-miashu"></i>描述此版本的新增内容，例如增添了何种新功能，有何改进之处以及修正了哪些错误。</p>
      <textarea {...input} placeholder={placeholder || label}></textarea>
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
    if (!e.target.files[0]) return;
    
    const url = getDomain("web/photo/upload")
    const formData = new FormData()
    formData.append('fileName', e.target.files[0])
    formData.append('width', 400)
    formData.append('height', 400)
    formData.append("fileType", JSON.stringify(['png']))
    formData.append("fileSize", 1024 * 300)

    fetchUtil.postJSON(url, formData, {
      jsonStringify: false,
      // credentials: true
    }).then(res=>{
      if (res.status == 200) {
        this.props.input.onChange(res.data.url)
      } else {
        debug.warn('上传图片不符合规格')
      }
    }).catch(e=>{
      console.log('网络错误', e)
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

export class renderAPKFile extends Component {
  state ={
    file: {},
    start: 0,
    end: 1 * 1024 * 1024,
    sessionId: null,
    shardSize: 1 * 1024 * 1024,
    txt:""
  }
  fileUpload(e) {
    if (!e.target.files[0]) return;
    const fileValue = e.target.files[0];
    // const name = file.name;
    const size = fileValue.size;
    const shardSize = 1 * 1024 * 1024 ;
    this.setState({shardSize:shardSize,txt:"请稍等..."},this.upload(fileValue) )
  }

  upload(file){
    const {start, end, shardSize, sessionId} = this.state
     //计算每一片的起始与结束位置
    const xhr=new XMLHttpRequest();
    const fd = new FormData();
    const that = this;
    const url = getDomain('web/bo_appstore?clientType=1')
    //xapi.intra.sit.ffan.net
    //getUploaderDomain('web/bo_appstore?clientType=1')
    const readyChange = (that) => {
      if(xhr.readyState==4){
        if(xhr.status>=200&&xhr.status<300){
          if (JSON.parse(xhr.responseText).status == 500 || JSON.parse(xhr.responseText).status == 404) {
            alert(JSON.parse(xhr.responseText).message);
            return

            //des.style.width='0%';
            //num.innerHTML='';
            //clearInterval(clock);
          } else {
            const changeEnd = end + shardSize > file.size ? file.size : end + shardSize
            const res = JSON.parse(xhr.responseText).data
            let resp = JSON.parse(xhr.responseText).data.responseBody;
            if(resp){
              that.setState({ start: end, end: changeEnd, sessionId: res["X-Session-Id"],resp:resp}, that.upload(file))
            }else{
               const fileObj ={
                 url:'http://storage.intra.sit.ffan.net/large_files/bo_appstore/'+this.state.resp,
                 name:file.name,
                 size:file.size
               }
               console.log(fileObj)
               this.props.input.onChange(fileObj)
               return
            }
          }
        }
      }
    }
                //构造一个表单，FormData是HTML5新增的
    fd.append("X-Content-Range", 'bytes ' + start + '-' + (end-1) + '/' + file.size)
    sessionId ? fd.append("X-Session-Id", sessionId):'';
    fd.append("data", file.slice(start,end));  //slice方法用于切出文件的一部分
                  //Ajax提交
    xhr.open('POST',url,true);
          //xhr.setRequestHeader('Content-Type','application/x-www-form-urlencoded');
    xhr.onreadystatechange=function(){
      readyChange(that)
    }
    // xhr.upload.onprogress=function(ev){
    //   if(ev.lengthComputable){
    //     pecent=100*(ev.loaded+start)/file.size;
    //   if(pecent>100){
    //     pecent=100;
    //   }
    //   //num.innerHTML=parseInt(pecent)+'%';
    //   des.style.width=pecent+'%';
    //   des.innerHTML = parseInt(pecent)+'%'
    //   }

   xhr.send(fd);
  }
  
  render() {
    const { input, tags, label, meta: { touched, dirty, error, warning }} = this.props
    
    return (
      <div className="form-row">
        <label>{label}</label>
        <div className="row-right">
          <span className="right-upload">
            <input type="button" value="选择文件" />
            <input type="file" accept=".apk" onChange={::this.fileUpload} />
            {input.value.name?input.value.name:this.state.txt}

          </span>
          {(dirty || touched) && ((error && <span>{error}</span>))}
        </div>
      </div>
    )
  }
  
}

export class renderFile extends Component {

  fileUpload(e) {
    if (!e.target.files[0]) return;
    
    const url = getDomain("web/file/upload")
    const formData = new FormData()

    
    formData.append('fileName', e.target.files[ 0 ])

    fetchUtil.postJSON(url, formData, {
      jsonStringify: false,
      // credentials: true
    }).then(res => {
      if (res.status === 200) {
        this.props.input.onChange(res.data)
      } else {
        debug.warn('文件代码包格式错误')
      }        
    }).catch(e => {
      console.log('网络错误', e)
    })
  }

  render() {
    const { input, tags, label, meta: { touched, dirty, error, warning } } = this.props

    return (
      <div className="form-row">
        <label>{label}</label>
        <div className="row-right">
          <span className="right-upload">
            <input type="button" value="选择文件" />
            <input type="file" accept=".zip" onChange={::this.fileUpload} />
            {input.value.originalName}
          </span>
          {(dirty || touched) && ((error && <span>{error}</span>))}
        </div>
      </div>
    )
  }
}

export const renderPublishRadioBox = ({ input, label ,publishList, meta: { touched, dirty, error, warning } }) => <div className="form-row">
  <label>{label}</label>
  <div className="row-right max-width">
    <p>
      在您的应用获得批准后，我们可以立即为您发布它。如果您要自己发布该应用。请选择一个日期或者在批准后的任何时刻手动发布它。
      当您的应用处于“等待开发人员发布”状态。您可以继续测试，或者拒绝发布并提交一个新的版本。无论您选择哪个选项，我们必须先
      处理您的应用，然后才能在应用市场上提供它。当您的应用处于“审核中”状态，您无法拒绝您的应用。
    </p>
    {
      publishList.map(item => <div className="row-sizeB" onClick={e => {input.onChange(item.value)}}>
          <div className="row-radio">
	          <input type="radio" name="radio" checked={input.value == item.value}/>
	          <span>
	            <i className="iconfont icon-radio1 icon-radio1V"></i>
	            <i className="iconfont icon-radio icon-radioV"></i>
	          </span>
	        </div>
          <span>{item.txt}</span>
      </div>
    )}
    <span className="clearF"></span>
    {(dirty || touched) && ((error && <span className="errorM">{error}</span>))}
  </div>
</div>
  
export default renderField

                //<b className='progress-stoke'><i className='progress-full'></i></b>