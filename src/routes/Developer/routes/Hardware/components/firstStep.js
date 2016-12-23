import React from 'react'
import { Field, reduxForm } from 'redux-form'
import { renderField, renderSelect, renderTextarea } from './renderField'
import { validate }  from '../modules/validate'
import fetchUtil from '../../../../utils/fetchUtil'


class HardwareFirstPage extends React.Component {
  state = {
    options: [],
    categoryChilds: []
  }

  async componentDidMount() {
    const apiUrl = `http://api.intra.sit.ffan.net/bo/v1/web/hardware/getCategory`;
    try {
      const res = await fetchUtil.getJSON(apiUrl);
      if(res.status === 200){
        res.data && res.data.list && this.setState({ options: res.data.list })
      } else {
        res.msg && window.alert(res.msg);
      }
    } catch (e) {
      console.log(e)
    }
  }
  imgUpload() {

  }

  render() {
    const { handleSubmit, submitting, pristine, invalid } = this.props
    const { options, categoryChilds } = this.state
    return (
      <form onSubmit={handleSubmit}>
        <Field name="hardwareName" type="text" label="硬件名称" component={renderField} />
        <div>
        	<label>硬件LOGO</label>
        	<div>
        		<p>请上传硬件高清图片</p>
				    <p>400*400像素，仅支持PNG格式，大小不超过300KB</p>
            <span>
              <input type="button" value="选择文件"/>
              <input type="file" accept=".png" onChange={this.imgUpload.bind(this)}/>
            </span>
        		<div className="img-container">
              <img src={this.state.imgUrl} alt="上传图片"  className="img-thumbnail"/>
            </div>
        	</div>
        </div>
        <Field name="hardwareDesc" label="硬件介绍" component={renderTextarea} />
        <Field name="majorCategoryId" label="分类" component={renderSelect} options={options}/>
        <Field name="minorCategoryId" component={renderSelect} options={categoryChilds}/>      
        <Field name="hardwareMode" type="text" label="产品型号" component={renderField} />
        <Field name="hardwareProducer" type="text" label="生产厂家" component={renderField} />
        <Field name="commType1" type="number" label="通讯方案" placeholder="方案一" component={renderField} />
        <Field name="commType2" type="number" label="" placeholder="方案二" component={renderField} />
        <div>
          <button type="submit" className="btn btn-primary">保存并下一步</button>
        </div>
      </form>
    )
  }
}

export default reduxForm({
  form: 'hardware',            
  destroyOnUnmount: false,     // <------ preserve form data
  validate,
  // asyncValidate,
  // asyncBlurFields: [ 'username' ]
})(HardwareFirstPage)