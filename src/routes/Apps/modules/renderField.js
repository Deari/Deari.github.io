import React, { Component, PropTypes } from 'react'
import fetchUtil from 'utils/fetchUtil'
import { getDomain } from 'utils/domain'
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

export class renderFile extends Component {

  fileUpload(e) {
    if (!e.target.files[0]) return;
    const file = e.target.files[0];
    const name = file.name;
    const size = file.size;
    let succeed =0;
    const shardSize = 10 * 1024 * 1024 ;
    const shardCount = Math.ceil(size / shardSize);  //总片数
    let sessionId = 0;
    let json = {};
    for(var i = 0;i < shardCount;++i){
      //计算每一片的起始与结束位置
      const xhr=new XMLHttpRequest();
      var start = i * shardSize,
          end = Math.min(size, start + shardSize);
                //构造一个表单，FormData是HTML5新增的
      
      if(i=0){
        json = {
          'X-Content-Range':'bytes' + start + '-' + end + '/' + size ,
        }
      }else{
        json = {
          'X-Content-Range':'bytes' + start + '-' + end + '/' + size ,
          'X-Session-Id': sessionId
        }
      }
    
      // var fd = new FormData();
      //     fd.append("data", file.slice(start,end));  //slice方法用于切出文件的一部分
      //               console.log(file.slice(start,end));
      //     fd.append("name", name);
      //     fd.append("total", shardCount);  //总片数
      //     fd.append("index", i + 1);        //当前是第几片
                //Ajax提交
          xhr.open('POST','http://10.1.82.114/app/v1/bo/v1/web/bo_appstore?clientType=1',true);
          xhr.setRequestHeader('Content-Type','application/x-www-form-urlencoded');
          // xhr.setRequestHeader('X-Content-Range',);
          xhr.onreadystatechange=function(){
            if(this.readyState==4){
              if(this.status>=200&&this.status<300){
                if(this.responseText.indexOf('failed') >= 0){
                alert('文件发送失败，请重新发送');
                //des.style.width='0%';
                //num.innerHTML='';
                //clearInterval(clock);
                }else{
                //alert(this.responseText)
                // pending=false;
                 ++succeed;
                 console.log(responseText)
                 console.log(succeed+'/'+shardCount)
                }
          
              }
            }
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
   
             xhr.send(json);
           }　　
  }

  
  render() {
    const { input, tags, label, meta: { touched, dirty, error, warning }} = this.props
    
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
