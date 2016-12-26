import React from 'react'
import { Field, reduxForm } from 'redux-form'
import { renderField, renderSelect, renderCheckbox, renderTextarea } from './renderField'
import { validate }  from '../modules/validate'
import fetchUtil from '../../../../utils/fetchUtil'


class HardwareSecondPage extends React.Component {
  state = {
    sdkTypeList: [],
    osList: [],
    platformList: [],
    imgUrl: '',
    fileName: ''
  }

  async componentDidMount() {
    const apiUrl = `http://api.intra.sit.ffan.net/bo/v1/web/hardware/getSdkInfo`;
    try {
      const res = await fetchUtil.getJSON(apiUrl);
      if(res.status === 200){
        res.data && this.setState({ 
          sdkTypeList: res.data.sdkType,
          osList: res.data.os,
          platformList: res.data.platform,
        })
      } else {
        res.msg && window.alert(res.msg);
      }
    } catch (e) {
      console.log(e)
    }
  }
  async upload(type, e) {
    const hardwareLogo = e.target.files ? e.target.files[0] : '';
    if (!hardwareLogo) return;
    let formData = new FormData()
    formData.append('fileName', hardwareLogo)
    const url = `http://api.intra.sit.ffan.net/bo/v1/web/${type}/upload`
    const res = await fetch(url, {
      method: "POST",
      body: formData
    });
    const result = await res.json();
    if (result.data) {
      type === 'photo' ? this.setState({imgUrl: result.data.url}) : this.setState({fileName: result.data.name});
    }
  }

  render() {
    const { handleSubmit, submitting, pristine, invalid } = this.props
    const { sdkTypeList, osList, platformList, imgUrl, fileName } = this.state
    return (
      <form onSubmit={handleSubmit}>
        <Field name="hardwareMode" type="text" label="硬件型号" component={renderField} />
        <div>
        	<label>硬件图片</label>
        	<div>
        		<p>请上传硬件真实图片</p>
				    <p>要求细节清晰，尺寸不限，最多上传4张，每张大小不超过1M。</p>
            <span>
              <input type="button" value="选择文件"/>
              <input type="file" accept=".png" onChange={this.upload.bind(this, 'photo')}/>
            </span>
        		<div className="img-container">
              <img src={imgUrl} alt="上传图片"  className="img-thumbnail"/>
            </div>
        	</div>
        </div>
        <Field name="hardwareProducer" type="text" label="生产厂家" component={renderField} />
        <Field name="hardwarePp" type="text" label="硬件品牌" component={renderField} />
        <div>
          <label>通讯方式</label>
          <div>
            <label><Field name="commType1" component="input" type="checkbox" value="1"/> WIFI</label>
            <label><Field name="commType2" component="input" type="checkbox" value="2"/> 蓝牙</label>
          </div>
        </div>
        <Field name="hardwareDetail" label="详细功描述" component={renderTextarea} />
        <Field name="sdkType" label="SDK类型" component={renderSelect} options={sdkTypeList}/>
        <Field name="os" label="操作平台" component={renderSelect} options={osList}/>
        <Field name="hardwarePlatform" label="硬件平台" component={renderSelect} options={platformList}/>
        <div>
        	<label>上传测试报告</label>
        	<div>
            <span>
              <input type="button" value="选择文件"/>
              <input type="file" onChange={this.upload.bind(this, 'file')}/>
            </span>
            <span>{fileName}</span>
        	</div>
        </div>        
        <div>
          <button type="button" className="" onClick={this.props.onClickPrev}>上一步</button>
          <button type="submit" className="btn-primary">保存并下一步</button>
        </div>
      </form>
    )
  }
}

export default reduxForm({
  form: 'hardware',            
  destroyOnUnmount: false,     // <------ preserve form data
  validate,
})(HardwareSecondPage)