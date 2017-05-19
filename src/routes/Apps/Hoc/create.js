import React from 'react'
import { connect } from 'react-redux'
import { getFormValues, Field, reduxForm } from 'redux-form'

import {
  postAppBasicInfo,
  fetchTags
} from 'reducers/api'

const BasicFormHOC = (Wrapper) => class Container extends React.Component {
  state ={
    tags: []
  }

  componentDidMount() {
    fetchTags().then(data=>{
      this.setState({
        tags: data
      })
    })
  }
  render() {
    const newProps = {
      tagSource: this.state.tags
    }
    return <Wrapper {...this.props} {...newProps}></Wrapper>
  }
}

export default BasicFormHOC