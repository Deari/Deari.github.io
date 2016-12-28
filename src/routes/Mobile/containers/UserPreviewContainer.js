import React, { Component } from 'react'
import UserPreview from '../components/UserPreview'
import fetchUtil from '../../utils/fetchUtil'

const promised = {
  promise: fetchUtil.getJSON('http://api.intra.sit.ffan.net/bo/v1/web/merchant/page/3')
}

export const Promised = (promiseProp, Wrapped) => class extends Component {

  state = {
    preview: {
      elements: [],
      layouts: [],
    }
  }

  componentDidMount() {
    promiseProp.promise.then(v => {
      this.setState({preview: v.data.viewData})
    })
  }

  render() {
    //console.log(this.state.preview)
    return <Wrapped {...this.state.preview} />
  }
}

export default Promised(promised, UserPreview)
