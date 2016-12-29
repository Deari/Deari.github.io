import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { Field, reduxForm } from 'redux-form'

import { validate, warn } from '../modules/validate'
import { test } from '../modules/create'

import Sidebar from '../../../../../components/Sidebar'
import FirstStepForm from '../components/FirstStepForm'
import SecondStepForm from '../components/SecondStepForm'
import Complete from '../components/Complete'
import Step from '../components/Step'

import { getDomain } from '../../../../utils/domain'
import fetchUtil from '../../../../utils/fetchUtil'

import { toggleStep, updateAppId, fetchTags, fetchCates,
  toggleTag, updateForm2 } from '../modules/create'

class CreateContainer extends Component {
  
  async componentDidMount() {
    // console.log("props:", this.props);
    this.props.fetchTags()
    this.props.fetchCates()
  }

  imageUpload(e) {
    const url = getDomain("http://api.intra.","ffan.net/bo/v1/web/photo/upload")
    const formData = new FormData()
    formData.append('fileName', e.target.files[0])

    fetchUtil.postJSON(url, formData, {
      jsonStringify: false 
    }).then(res=>{
      console.log(`Upload Success: `, res)
      // do something
    }).catch(e=>{
      console.log(`Upload Failed.`)
      // do something
    })
  }

  fileUpload(e) {
    const url = getDomain("http://api.intra.","ffan.net/bo/v1/web/file/upload")
    const  formData = new FormData()
    formData.append('fileName', e.target.files[0])
    console.log(e.target.files[0].name);

    fetchUtil.postJSON(url, formData, {
      jsonStringify: false
    }).then(res=>{
      console.info(res);
      if(res.status === 200){
        this.props.updateForm2(res.data)
      } else{
        console.warn(res);
      }
    }).catch(e=>{
      console.warn(e);
    })
  }

  submitFirst(values) {

    console.log(values);

    const formData = new FormData();

    for(let key in values) {
      if(key == 'tags') {
        for(let v of values[key]){
          formData.append('tags[]', v)
        }
      } else {
        formData.append(key, values[key])
      }
    }

    const url = getDomain(`http://api.intra.`,`ffan.net/bo/v1/web/developer/app`)
    
    fetchUtil.postJSON(url, formData, { jsonStringify: false}).then(res=>{
      if(res.status == 200) {
        console.info(res.data)
        this.props.updateAppId(res.data.appId);
        // dispatch(completeSubmitCreate(res.data.app.appId));
        this.props.toggleStep(2);
      } else {
        throw Error('submit error');
      }
    }).catch(e=>{
      console.log(e);
      this.props.toggleStep(2);
    })
  }

  submitSecond(values) {
    console.log(values);
    if(!values.appId) {
      return;
    }

    // const url = getDomain(`http://api.intra.`, `ffan.net/bo/v1/web/developer/widget/${values.appId}/code`)
    const url = getDomain(`http://api.intra.`, `ffan.net/bo/v1/web/developer/app/${values.appId}/code`)

    const formData = new FormData();
    for(let key in values) {
      formData.append(key, values[key]);
    }

    formData.append('fileName', values['originalName']);
    formData.append('fileLink', values['url']);
   

    fetchUtil.postJSON(url, formData, {jsonStringify: false}).then(res=>{
      if (res.status == 200) {
        this.props.toggleStep(3);
      } else {
        console.warn(res);
      }
    }).catch(e=>{
      console.warn(e);
      // this.props.toggleStep(3);
    })
  }

  render() {
    const { toggleStep, toggleTag, create } = this.props;
    const { page, tags, cates, form, form2 } = create;

    const urls = {
      create: { url: `/apps/create` },
      list: { url: `/apps/list` },
      doc: { url: `/apps/doc` }
    }

    return (
      <div className="container clx">
        <Sidebar urls={urls} />
        <div className="sub-container">
          <Step page={page}/>
          {
            page === 1 && 
              <FirstStepForm 
                onSubmit={::this.submitFirst} 
                imageUpload={::this.imageUpload}
                toggleTag={toggleTag}
                tags={tags}
                cates={cates}
                initialValues={form}
              />
          }
          {
            page === 2 && 
              <SecondStepForm 
                previousPage={()=>toggleStep(1)} 
                fileUpload={::this.fileUpload}
                onSubmit={::this.submitSecond} 
                initialValues={form2}
              />
          }
          {
            page === 3 && 
            <Complete />
          }
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = {
  toggleStep,
  toggleTag,
  updateAppId,
  fetchTags,
  fetchCates,
  updateForm2
}

const mapStateToProps = ({ create }) => ({
  create,
})

export default connect(mapStateToProps, mapDispatchToProps)(CreateContainer)
