import React from 'react'
import { connect } from 'react-redux'
import {getFormValues, Field, reduxForm} from 'redux-form'

import {
  postAppBasicInfo,
  fetchTags
} from 'reducers/api'
import Basic from '../components/Basic'


class Container extends React.Component {

  state = {
    tags: [ { tagId: 1, tagName: 'test' } ]
  }

  componentWillMount() {
    fetchTags().then(data=>{
      this.setState({
        tags: data
      })
    })
  }

  onSubmit (values) {
    console.log(values);
    postAppBasicInfo()
  }

  render () {
    console.log(this.props.formValues)

    return <Basic tags={this.state.tags} onSubmit={::this.onSubmit}></Basic>
  }
}

export default connect((state)=>{
  return {
    formValues: getFormValues('create_apps')(state) || {},
  }
})(Container)