import React from 'react'
import { Field, reduxForm } from 'redux-form'
import { renderField, renderSelect } from './renderField'
import { validate }  from '../modules/validate'
import fetchUtil from '../../../../utils/fetchUtil'


class HardwareSecondPage extends React.Component {
  state = {
    sdkTypeList: [],
    osList: [],
    platformList: []
  }

  async componentDidMount() {
    const apiUrl = `http://api.intra.sit.ffan.net/bo/v1/web/hardware/getSdkInfo`;
    try {
      const res = await fetchUtil.getJSON(apiUrl);
      if(res.status === 200){
        res.data && res.data.list && this.setState({ 
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

  render() {
    const { handleSubmit, submitting, pristine, invalid } = this.props
    const { sdkTypeList, osList, platformList } = this.state
    return (
      <form onSubmit={handleSubmit}>
        <Field name="sdkType" label="SDK类型" component={renderSelect} options={sdkTypeList}/>
        <Field name="os" label="操作系统" component={renderSelect} options={osList}/>
        <Field name="hardwarePlatform" label="硬件平台" component={renderSelect} options={platformList}/>
        <a href="" target="_blank">
          <button type="button" className="btn-primary">下载SDK</button>
        </a>
        <div>
          <button type="button" className="" onClick={this.props.onClickPrev}>上一步</button>
          <button type="submit" className="btn-primary" disabled={submitting || pristine || invalid}>保存并下一步</button>
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